// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   currentUser,
//   loginUser,
//   registerUser,
// } from "../services/authService.js";

// const authContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Check logged-in user when app starts
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       // No token meaning user is not logged in
//       if (!token) {
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await currentUser();
//         setUser(response.data.user);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//       } catch (error) {
//         console.error("Auth check error", error);

//         // Token Invalid/ Expired
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         sessionStorage.removeItem("token");
//         sessionStorage.removeItem("user");

//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   // Login
//   const login = async ({ email, password }) => {
//     const response = await loginUser({
//       email,
//       password,
//     });

//     const { token, user } = response.data;

//     // Remove old auth
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("user");

//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//     return response;
//   };

//   // Register
//   const register = async (userData) => {
//     const response = await registerUser(userData);
//     const { token, user } = response.data;
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//     return response;
//   };

//   // Logout
//   const Logout = async () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   // value
//   const value = {
//     user,
//     setUser,
//     loading,
//     login,
//     register,
//     Logout,
//     isAuthenticated: !!user,
//   };

//   return <authContext.Provider value={value}>{children}</authContext.Provider>;
// };

// // Custome Hook
// export const useAuth = () => {
//   return useContext(authContext);
// };

















// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import {
//   currentUser,
//   loginUser,
//   registerUser,
// } from "../services/authService.js";

// const AuthContext = createContext(null);

// // =============================================================
// // STORAGE HELPERS (storage can throw in private mode / when blocked)
// // =============================================================

// const safe = (fn, fallback = null) => {
//   try {
//     return fn();
//   } catch {
//     return fallback;
//   }
// };

// const readToken = () =>
//   safe(
//     () => localStorage.getItem("token") || sessionStorage.getItem("token")
//   );

// const readStoredUser = () =>
//   safe(() => {
//     const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
//     return raw ? JSON.parse(raw) : null;
//   });

// // clears BOTH storages (previously Logout left sessionStorage behind)
// const clearAuthStorage = () =>
//   safe(() => {
//     [localStorage, sessionStorage].forEach((storage) => {
//       storage.removeItem("token");
//       storage.removeItem("user");
//     });
//   });

// // remember = true  -> survives closing the browser (localStorage)
// // remember = false -> cleared when the tab/browser closes (sessionStorage)
// const saveAuth = (token, user, remember) => {
//   clearAuthStorage();

//   safe(() => {
//     const storage = remember ? localStorage : sessionStorage;
//     storage.setItem("token", token);
//     storage.setItem("user", JSON.stringify(user));
//   });
// };

// // keep the stored user in the same storage as the token
// const persistUser = (user) =>
//   safe(() => {
//     const storage = localStorage.getItem("token")
//       ? localStorage
//       : sessionStorage.getItem("token")
//         ? sessionStorage
//         : null;

//     if (!storage) return;

//     if (user) storage.setItem("user", JSON.stringify(user));
//     else storage.removeItem("user");
//   });

// // Only an actual auth rejection should log the user out.
// // A network blip or a 500 must NOT wipe a valid session.
// const isAuthFailure = (error) => {
//   const status = error?.status ?? error?.response?.status;

//   if (status === 401 || status === 403) return true;
//   if (status >= 500) return false;

//   const message = String(error?.message || "");
//   if (/network|failed to fetch|timeout|offline/i.test(message)) return false;

//   return true;
// };

// // =============================================================
// // PROVIDER
// // =============================================================

// export const AuthProvider = ({ children }) => {
//   // Start from the cached user so the UI renders immediately,
//   // then verify the token in the background.
//   const [user, setUserState] = useState(() =>
//     readToken() ? readStoredUser() : null
//   );

//   const [loading, setLoading] = useState(
//     () => !!readToken() && !readStoredUser()
//   );

//   // -------------------------------------------------------
//   // Verify session on app start
//   // -------------------------------------------------------

//   useEffect(() => {
//     let cancelled = false;

//     const checkAuth = async () => {
//       if (!readToken()) {
//         setUserState(null);
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await currentUser();
//         if (cancelled) return;

//         const freshUser = response?.data?.user;

//         setUserState(freshUser);
//         persistUser(freshUser);
//       } catch (error) {
//         if (cancelled) return;
//         console.error("Auth check error", error);

//         if (isAuthFailure(error)) {
//           // token invalid / expired
//           clearAuthStorage();
//           setUserState(null);
//         }
//         // otherwise keep the cached session; it will re-verify next load
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     checkAuth();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   // -------------------------------------------------------
//   // Keep multiple tabs in sync (login/logout in another tab)
//   // -------------------------------------------------------

//   useEffect(() => {
//     const handleStorage = (event) => {
//       if (event.key !== "token" && event.key !== "user") return;

//       if (!readToken()) {
//         setUserState(null);
//         return;
//       }

//       const stored = readStoredUser();
//       if (stored) setUserState(stored);
//     };

//     window.addEventListener("storage", handleStorage);
//     return () => window.removeEventListener("storage", handleStorage);
//   }, []);

//   // -------------------------------------------------------
//   // Actions (stable references, so consumers don't re-render needlessly)
//   // -------------------------------------------------------

//   // setUser also persists, so pages that read the stored user
//   // (e.g. Messages) never see stale profile data
//   const setUser = useCallback((next) => {
//     setUserState((previous) => {
//       const resolved = typeof next === "function" ? next(previous) : next;
//       persistUser(resolved);
//       return resolved;
//     });
//   }, []);

//   const login = useCallback(async ({ email, password, remember = true }) => {
//     const response = await loginUser({ email, password });
//     const { token, user: loggedInUser } = response.data;

//     saveAuth(token, loggedInUser, remember);
//     setUserState(loggedInUser);

//     return response;
//   }, []);

//   const register = useCallback(async (userData) => {
//     const response = await registerUser(userData);
//     const { token, user: newUser } = response.data;

//     saveAuth(token, newUser, true);
//     setUserState(newUser);

//     return response;
//   }, []);

//   const Logout = useCallback(() => {
//     clearAuthStorage();
//     setUserState(null);
//   }, []);

//   const value = useMemo(
//     () => ({
//       user,
//       setUser,
//       loading,
//       login,
//       register,
//       Logout,
//       logout: Logout,
//       isAuthenticated: !!user,
//     }),
//     [user, setUser, loading, login, register, Logout]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // =============================================================
// // HOOK
// // =============================================================

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside <AuthProvider>");
//   }

//   return context;
// };



































import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../services/authService.js";

const AuthContext = createContext(null);

// =============================================================
// STORAGE HELPERS (storage can throw in private mode / when blocked)
// =============================================================

const safe = (fn, fallback = null) => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

const readToken = () =>
  safe(
    () => localStorage.getItem("token") || sessionStorage.getItem("token")
  );

const readStoredUser = () =>
  safe(() => {
    const raw = localStorage.getItem("user") || sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

// clears BOTH storages (previously Logout left sessionStorage behind)
const clearAuthStorage = () =>
  safe(() => {
    [localStorage, sessionStorage].forEach((storage) => {
      storage.removeItem("token");
      storage.removeItem("user");
    });
  });

// remember = true  -> survives closing the browser (localStorage)
// remember = false -> cleared when the tab/browser closes (sessionStorage)
const saveAuth = (token, user, remember) => {
  clearAuthStorage();

  safe(() => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
    storage.setItem("user", JSON.stringify(user));
  });
};

// keep the stored user in the same storage as the token
const persistUser = (user) =>
  safe(() => {
    const storage = localStorage.getItem("token")
      ? localStorage
      : sessionStorage.getItem("token")
        ? sessionStorage
        : null;

    if (!storage) return;

    if (user) storage.setItem("user", JSON.stringify(user));
    else storage.removeItem("user");
  });

// Only an actual auth rejection should log the user out.
// A network blip or a 500 must NOT wipe a valid session.
const isAuthFailure = (error) => {
  const status = error?.status ?? error?.response?.status;

  if (status === 401 || status === 403) return true;
  if (status >= 500) return false;

  const message = String(error?.message || "");
  if (/network|failed to fetch|timeout|offline/i.test(message)) return false;

  return true;
};

// =============================================================
// PROVIDER
// =============================================================

export const AuthProvider = ({ children }) => {
  // Start from the cached user so the UI renders immediately,
  // then verify the token in the background.
  const [user, setUserState] = useState(() =>
    readToken() ? readStoredUser() : null
  );

  const [loading, setLoading] = useState(
    () => !!readToken() && !readStoredUser()
  );

  // -------------------------------------------------------
  // Verify session on app start
  // -------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      if (!readToken()) {
        setUserState(null);
        setLoading(false);
        return;
      }

      try {
        const response = await currentUser();
        if (cancelled) return;

        const freshUser = response?.data?.user;

        setUserState(freshUser);
        persistUser(freshUser);
      } catch (error) {
        if (cancelled) return;
        console.error("Auth check error", error);

        if (isAuthFailure(error)) {
          // token invalid / expired
          clearAuthStorage();
          setUserState(null);
        }
        // otherwise keep the cached session; it will re-verify next load
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    checkAuth();

    return () => {
      cancelled = true;
    };
  }, []);

  // -------------------------------------------------------
  // Keep multiple tabs in sync (login/logout in another tab)
  // -------------------------------------------------------

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== "token" && event.key !== "user") return;

      if (!readToken()) {
        setUserState(null);
        return;
      }

      const stored = readStoredUser();
      if (stored) setUserState(stored);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // -------------------------------------------------------
  // Actions (stable references, so consumers don't re-render needlessly)
  // -------------------------------------------------------

  // api.js fires this once when the server answers 401 to an authenticated
  // request (expired/revoked token). Log out instead of leaving a dead session.
  useEffect(() => {
    const handleAuthExpired = () => {
      clearAuthStorage();
      setUserState(null);
    };

    window.addEventListener("auth:expired", handleAuthExpired);
    return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, []);

  // setUser also persists, so pages that read the stored user
  // (e.g. Messages) never see stale profile data
  const setUser = useCallback((next) => {
    setUserState((previous) => {
      const resolved = typeof next === "function" ? next(previous) : next;
      persistUser(resolved);
      return resolved;
    });
  }, []);

  const login = useCallback(async ({ email, password, remember = true }) => {
    const response = await loginUser({ email, password });
    const { token, user: loggedInUser } = response.data;

    saveAuth(token, loggedInUser, remember);
    setUserState(loggedInUser);

    return response;
  }, []);

  const register = useCallback(async (userData) => {
    const response = await registerUser(userData);
    const { token, user: newUser } = response.data;

    saveAuth(token, newUser, true);
    setUserState(newUser);

    return response;
  }, []);

  const Logout = useCallback(() => {
    clearAuthStorage();
    setUserState(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      login,
      register,
      Logout,
      logout: Logout,
      isAuthenticated: !!user,
    }),
    [user, setUser, loading, login, register, Logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =============================================================
// HOOK
// =============================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }

  return context;
};