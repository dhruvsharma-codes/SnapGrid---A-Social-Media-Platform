import { fetchWithAuth } from "./api";

export const toggleLike = async (postId) => {
  return await fetchWithAuth(`/likes/${postId}`, {
    method: "POST",
  });
};
