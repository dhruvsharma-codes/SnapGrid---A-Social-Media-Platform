

// import { fetchWithAuth } from "./api.js";

// // const API_URL = "http://localhost:5000/api";
// const API_URL = `${import.meta.env.VITE_API_URL}/api`;


// export const createPost = async (postData) => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");

//   if (!token) {
//     throw new Error("Authentication token not found");
//   }

//   const response = await fetch(`${API_URL}/posts`, {
//     method: "POST",

//     headers: {
//       Authorization: `Bearer ${token}`,
//     },

//     body: postData,
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Failed to create post");
//   }

//   return data;
// };

// export const getFeedPosts = async (page = 1, limit = 10) => {
//   return await fetchWithAuth(`/posts/feed?page=${page}&limit=${limit}`);
// };

// export const getUserPosts = async (username) => {
//   return await fetchWithAuth(`/posts/user/${username}`);
// };


// export const deletePost = async (postId) => {
//   return await fetchWithAuth(`/posts/${postId}`, {
//     method: "DELETE",
//   });
// };















































import { fetchWithAuth } from "./api.js";

// keep pagination values sane, whatever the caller passes
const toBoundedInt = (value, fallback, max) => {
  const number = Number.parseInt(value, 10);

  if (!Number.isFinite(number) || number < 1) return fallback;
  return Math.min(number, max);
};

export const createPost = async (postData) => {
  // postData is FormData; fetchWithAuth leaves Content-Type to the browser
  return await fetchWithAuth("/posts", {
    method: "POST",
    body: postData,
    errorMessage: "Failed to create post",
  });
};

export const getFeedPosts = async (page = 1, limit = 10) => {
  const safePage = toBoundedInt(page, 1, 100000);
  const safeLimit = toBoundedInt(limit, 10, 50);

  return await fetchWithAuth(
    `/posts/feed?page=${safePage}&limit=${safeLimit}`
  );
};

export const getUserPosts = async (username) => {
  return await fetchWithAuth(`/posts/user/${encodeURIComponent(username)}`);
};

export const deletePost = async (postId) => {
  return await fetchWithAuth(`/posts/${encodeURIComponent(postId)}`, {
    method: "DELETE",
  });
};