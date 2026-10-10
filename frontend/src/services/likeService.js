// import { fetchWithAuth } from "./api";

// export const toggleLike = async (postId) => {
//   return await fetchWithAuth(`/likes/${postId}`, {
//     method: "POST",
//   });
// };




















import { fetchWithAuth } from "./api.js";

export const toggleLike = async (postId) => {
  return await fetchWithAuth(`/likes/${encodeURIComponent(postId)}`, {
    method: "POST",
  });
};