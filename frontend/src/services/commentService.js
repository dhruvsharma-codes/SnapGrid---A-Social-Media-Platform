

// import { fetchWithAuth } from "./api.js";

// export const getPostComments = async (postId) => {
//   return await fetchWithAuth(`/comments/${postId}`);
// };

// export const createComment = async (postId, content) => {
//   return await fetchWithAuth(`/comments/${postId}`, {
//     method: "POST",
//     body: JSON.stringify({
//       content,
//     }),
//   });
// };

// export const deleteComment = async (commentId) => {
//   return await fetchWithAuth(`/comments/${commentId}`, {
//     method: "DELETE",
//   });
// };


































import { fetchWithAuth } from "./api.js";

export const getPostComments = async (postId) => {
  return await fetchWithAuth(`/comments/${encodeURIComponent(postId)}`);
};

export const createComment = async (postId, content) => {
  return await fetchWithAuth(`/comments/${encodeURIComponent(postId)}`, {
    method: "POST",
    body: JSON.stringify({
      content,
    }),
  });
};

export const deleteComment = async (commentId) => {
  return await fetchWithAuth(`/comments/${encodeURIComponent(commentId)}`, {
    method: "DELETE",
  });
};