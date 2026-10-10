// // const API_URL = "http://localhost:5000/api";
// const API_URL = `${import.meta.env.VITE_API_URL}/api`;


// export const fetchWithAuth = async (url, options = {}) => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");

//   if (!token) {
//     throw new Error("Authentication token not found");
//   }

//   const response = await fetch(`${API_URL}${url}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }

//   return data;
// };








































const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const REQUEST_TIMEOUT_MS = 20_000;
const UPLOAD_TIMEOUT_MS = 60_000;
const RETRY_DELAY_MS = 300;

// The token travels in the Authorization header. Over plain HTTP anyone on the
// network can read it, so make a misconfigured production build obvious.
if (import.meta.env.PROD && API_URL.startsWith("http://")) {
  console.warn(
    "[security] VITE_API_URL is not HTTPS. Auth tokens can be intercepted."
  );
}

// =============================================================
// ERROR TYPE
// =============================================================
// Still an Error with a normal `.message`, so existing
// `error.message` handling in components keeps working. The extra
// `.status` is what AuthContext uses to tell "token expired" (401)
// apart from "server/network problem".

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// =============================================================
// HELPERS
// =============================================================

const getToken = () => {
  try {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  } catch {
    return null;
  }
};

const clearAuthStorage = () => {
  try {
    [localStorage, sessionStorage].forEach((storage) => {
      storage.removeItem("token");
      storage.removeItem("user");
    });
  } catch {
    // storage unavailable
  }
};

// Fired once when the server says the token is no longer valid, so the app
// can log out instead of leaving the user stuck on a dead session.
let authExpiredNotified = false;

const notifyAuthExpired = () => {
  if (authExpiredNotified) return;
  authExpiredNotified = true;

  clearAuthStorage();
  window.dispatchEvent(new Event("auth:expired"));
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Never crashes on an empty (204) or non-JSON body (e.g. an HTML 502 page).
const parseBody = async (response) => {
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

// fetch() with a timeout, so a hanging server can't freeze the UI forever
const fetchWithTimeout = async (fullUrl, init, timeoutMs) => {
  const controller = new AbortController();
  const callerSignal = init.signal;
  let timedOut = false;

  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  const onCallerAbort = () => controller.abort();
  callerSignal?.addEventListener("abort", onCallerAbort);
  if (callerSignal?.aborted) controller.abort();

  try {
    return await fetch(fullUrl, { ...init, signal: controller.signal });
  } catch (error) {
    if (timedOut) {
      throw new ApiError("Request timeout. Please try again.", 0);
    }

    // the caller cancelled on purpose: let it through untouched
    if (error?.name === "AbortError") throw error;

    const networkError = new ApiError(
      "Network error. Please check your connection.",
      0
    );
    networkError.retryable = true;
    throw networkError;
  } finally {
    clearTimeout(timer);
    callerSignal?.removeEventListener("abort", onCallerAbort);
  }
};

const assertPath = (url) => {
  // paths only: guarantees the token can never be sent to another origin
  if (typeof url !== "string" || !url.startsWith("/") || url.startsWith("//")) {
    throw new Error("Invalid request URL");
  }
};

// =============================================================
// AUTHENTICATED REQUESTS
// =============================================================
// Same call signature as before: fetchWithAuth(url, options).
// Extra, optional options (stripped before they reach fetch):
//   errorMessage -> fallback text if the server sends no message
//   authExpiry   -> set false for endpoints where a 401 does NOT mean the
//                   session expired (e.g. "wrong current password")

const inflightGets = new Map();

export const fetchWithAuth = async (url, options = {}) => {
  const { errorMessage, authExpiry = true, ...fetchOptions } = options;

  assertPath(url);

  const token = getToken();

  if (!token) {
    throw new ApiError("Authentication token not found", 401);
  }

  authExpiredNotified = false; // a valid token exists again

  const method = String(fetchOptions.method || "GET").toUpperCase();

  // FormData must NOT get a JSON Content-Type: the browser has to set the
  // multipart boundary itself. (This is what lets uploads share this function.)
  const isFormData =
    typeof FormData !== "undefined" && fetchOptions.body instanceof FormData;

  const init = {
    ...fetchOptions,
    method,
    cache: "no-store", // private data should never sit in the HTTP cache
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...fetchOptions.headers,
      Authorization: `Bearer ${token}`, // last, so it can't be overridden
    },
  };

  const timeoutMs = isFormData ? UPLOAD_TIMEOUT_MS : REQUEST_TIMEOUT_MS;

  const attempt = async () => {
    const response = await fetchWithTimeout(`${API_URL}${url}`, init, timeoutMs);
    const data = await parseBody(response);

    if (!response.ok) {
      if (response.status === 401 && authExpiry) notifyAuthExpired();

      throw new ApiError(
        data?.message || errorMessage || "Something went wrong",
        response.status,
        data
      );
    }

    return data ?? {};
  };

  // GET requests get one automatic retry on a network blip.
  // Writes are never retried (that could create duplicates).
  const run = async () => {
    const maxAttempts = method === "GET" ? 2 : 1;

    for (let n = 1; ; n++) {
      try {
        return await attempt();
      } catch (error) {
        if (n < maxAttempts && error?.retryable) {
          await sleep(RETRY_DELAY_MS);
          continue;
        }
        throw error;
      }
    }
  };

  // Identical GETs happening at the same moment share ONE network request
  // (e.g. the navbar and a page both asking for the unread count).
  if (method === "GET" && !fetchOptions.signal) {
    const key = `${token}\n${url}`;
    const existing = inflightGets.get(key);
    if (existing) return existing;

    const promise = run().finally(() => inflightGets.delete(key));
    inflightGets.set(key, promise);
    return promise;
  }

  return run();
};

// =============================================================
// PUBLIC REQUESTS (login / register: no token yet)
// =============================================================

export const fetchPublic = async (url, options = {}) => {
  const { errorMessage, ...fetchOptions } = options;

  assertPath(url);

  const response = await fetchWithTimeout(
    `${API_URL}${url}`,
    {
      ...fetchOptions,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    },
    REQUEST_TIMEOUT_MS
  );

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(
      data?.message || errorMessage || "Something went wrong",
      response.status,
      data
    );
  }

  return data ?? {};
};