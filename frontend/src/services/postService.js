

import { fetchWithAuth } from "./api.js";

const API_URL = "http://localhost:5000/api";

export const createPost = async (postData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: postData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create post");
  }

  return data;
};

export const getFeedPosts = async (page = 1, limit = 10) => {
  return await fetchWithAuth(`/posts/feed?page=${page}&limit=${limit}`);
};

export const getUserPosts = async (username) => {
  return await fetchWithAuth(`/posts/user/${username}`);
};
