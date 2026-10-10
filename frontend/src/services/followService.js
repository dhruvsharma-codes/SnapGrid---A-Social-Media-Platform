// import { fetchWithAuth } from "./api.js";


// // Send follow request
// export const sendFollowRequest = async (userId) => {
//   return await fetchWithAuth(
//     `/follows/request/${userId}`,
//     {
//       method: "POST",
//     }
//   );
// };


// // Get follow status
// export const getFollowStatus = async (userId) => {
//   return await fetchWithAuth(
//     `/follows/status/${userId}`
//   );
// };


// // Follow back
// export const followBack = async (requestId) => {
//   return await fetchWithAuth(
//     `/follows/follow-back/${requestId}`,
//     {
//       method: "POST",
//     }
//   );
// };


// // Reject request
// export const rejectFollowRequest = async (
//   requestId
// ) => {
//   return await fetchWithAuth(
//     `/follows/reject/${requestId}`,
//     {
//       method: "POST",
//     }
//   );
// };


// // Get followers
// export const getFollowers = async () => {
//   return await fetchWithAuth("/follows/followers");
// };


// // Get following
// export const getFollowing = async () => {
//   return await fetchWithAuth("/follows/following");
// };


// // Unfollow user
// export const unfollowUser = async (userId) => {
//   return await fetchWithAuth(
//     `/follows/unfollow/${userId}`,
//     {
//       method: "DELETE",
//     }
//   );
// };




































import { fetchWithAuth } from "./api.js";

const id = encodeURIComponent;

// Send follow request
export const sendFollowRequest = async (userId) => {
  return await fetchWithAuth(`/follows/request/${id(userId)}`, {
    method: "POST",
  });
};

// Get follow status
export const getFollowStatus = async (userId) => {
  return await fetchWithAuth(`/follows/status/${id(userId)}`);
};

// Follow back
export const followBack = async (requestId) => {
  return await fetchWithAuth(`/follows/follow-back/${id(requestId)}`, {
    method: "POST",
  });
};

// Reject request
export const rejectFollowRequest = async (requestId) => {
  return await fetchWithAuth(`/follows/reject/${id(requestId)}`, {
    method: "POST",
  });
};

// Get followers
export const getFollowers = async () => {
  return await fetchWithAuth("/follows/followers");
};

// Get following
export const getFollowing = async () => {
  return await fetchWithAuth("/follows/following");
};

// Unfollow user
export const unfollowUser = async (userId) => {
  return await fetchWithAuth(`/follows/unfollow/${id(userId)}`, {
    method: "DELETE",
  });
};