// import { fetchWithAuth } from "../services/api.js";

// export const getUserProfile = async (username) => {
//   return await fetchWithAuth(`/users/${username}`);
// };

// export const updateProfile = async (formData) => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");

//   if (!token) {
//     throw new Error("Authentication token not found");
//   }

//   const response = await fetch("http://localhost:5000/api/users/profile", {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: formData,
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Failed to update profile");
//   }

//   return data;
// };

// export const searchUsers = async (query) => {
//   return await fetchWithAuth(`/users/search?q=${encodeURIComponent(query)}`);
// };

// export const getSuggestedUsers =
//   async () => {
//     return await fetchWithAuth(
//       "/users/suggestions"
//     );
//   };



































import { fetchWithAuth } from "./api.js";

export const getUserProfile = async (username) => {
  return await fetchWithAuth(`/users/${encodeURIComponent(username)}`);
};

export const updateProfile = async (formData) => {
  // This used to call http://localhost:5000 directly, so profile updates
  // were broken in production. It now uses the shared API URL.
  return await fetchWithAuth("/users/profile", {
    method: "PUT",
    body: formData,
    errorMessage: "Failed to update profile",
  });
};

export const searchUsers = async (query) => {
  const safeQuery = String(query ?? "").trim().slice(0, 100);

  return await fetchWithAuth(
    `/users/search?q=${encodeURIComponent(safeQuery)}`
  );
};

export const getSuggestedUsers = async () => {
  return await fetchWithAuth("/users/suggestions");
};