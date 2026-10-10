// import { fetchWithAuth } from "./api.js";

// export const savePost = async (postId) => {
//   return await fetchWithAuth(
//     `/posts/${postId}/save`,
//     {
//       method: "POST",
//     }
//   );
// };

// export const unsavePost = async (postId) => {
//   return await fetchWithAuth(
//     `/posts/${postId}/save`,
//     {
//       method: "DELETE",
//     }
//   );
// };

// export const getSaveStatus = async (postId) => {
//   return await fetchWithAuth(
//     `/posts/${postId}/save-status`
//   );
// };

// export const getSavedPosts = async () => {
//   return await fetchWithAuth(
//     "/posts/saved"
//   );
// };































import { fetchWithAuth } from "./api.js";

const id = encodeURIComponent;

export const savePost = async (postId) => {
  return await fetchWithAuth(`/posts/${id(postId)}/save`, {
    method: "POST",
  });
};

export const unsavePost = async (postId) => {
  return await fetchWithAuth(`/posts/${id(postId)}/save`, {
    method: "DELETE",
  });
};

export const getSaveStatus = async (postId) => {
  return await fetchWithAuth(`/posts/${id(postId)}/save-status`);
};

export const getSavedPosts = async () => {
  return await fetchWithAuth("/posts/saved");
};