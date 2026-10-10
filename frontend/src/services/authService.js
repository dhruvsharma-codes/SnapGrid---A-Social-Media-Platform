// import { fetchWithAuth } from "./api.js";

// // const API_URL = "http://localhost:5000/api/auth";
// const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;


// export const registerUser = async (userData) => {
//   const response = await fetch(`${API_URL}/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Registration failed");
//   }
//   return data;
// };

// export const loginUser = async (loginData) => {
//   const response = await fetch(`${API_URL}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(loginData),
//   });
//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Login failed");
//   }
//   return data;
// };

// export const currentUser = async () => {
//   return await fetchWithAuth("/auth/getMe");
// };



// export const changePassword = async ({
//   currentPassword,
//   newPassword,
// }) => {
//   return await fetchWithAuth(
//     "/auth/change-password",
//     {
//       method: "PUT",
//       body: JSON.stringify({
//         currentPassword,
//         newPassword,
//       }),
//     }
//   );
// };










































import { fetchWithAuth, fetchPublic } from "./api.js";

export const registerUser = async (userData) => {
  return await fetchPublic("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
    errorMessage: "Registration failed",
  });
};

export const loginUser = async (loginData) => {
  return await fetchPublic("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    errorMessage: "Login failed",
  });
};

export const currentUser = async () => {
  return await fetchWithAuth("/auth/getMe");
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  return await fetchWithAuth("/auth/change-password", {
    method: "PUT",
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
    // a 401 here can simply mean "current password is wrong",
    // which must not log the user out
    authExpiry: false,
  });
};