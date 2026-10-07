import { fetchWithAuth } from "../services/api.js";

export const getUserProfile = async (username) => {
  return await fetchWithAuth(`/users/${username}`);
};

export const updateProfile = async (formData) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await fetch("http://localhost:5000/api/users/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
};

export const searchUsers = async (query) => {
  return await fetchWithAuth(`/users/search?q=${encodeURIComponent(query)}`);
};

export const getSuggestedUsers =
  async () => {
    return await fetchWithAuth(
      "/users/suggestions"
    );
  };
