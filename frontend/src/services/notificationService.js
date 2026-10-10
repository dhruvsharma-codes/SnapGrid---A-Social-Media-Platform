
// import { fetchWithAuth } from "./api.js";

// export const getNotifications = async () => {
//   return await fetchWithAuth("/notifications");
// };

// export const getUnreadNotificationCount = async () => {
//   return await fetchWithAuth("/notifications/unread-count");
// };

// export const markNotificationAsRead = async (notificationId) => {
//   return await fetchWithAuth(
//     `/notifications/${notificationId}/read`,
//     {
//       method: "PATCH",
//     }
//   );
// };

// export const markAllNotificationsAsRead = async () => {
//   return await fetchWithAuth(
//     "/notifications/read-all",
//     {
//       method: "PATCH",
//     }
//   );
// };
































import { fetchWithAuth } from "./api.js";

export const getNotifications = async () => {
  return await fetchWithAuth("/notifications");
};

export const getUnreadNotificationCount = async () => {
  return await fetchWithAuth("/notifications/unread-count");
};

export const markNotificationAsRead = async (notificationId) => {
  return await fetchWithAuth(
    `/notifications/${encodeURIComponent(notificationId)}/read`,
    {
      method: "PATCH",
    }
  );
};

export const markAllNotificationsAsRead = async () => {
  return await fetchWithAuth("/notifications/read-all", {
    method: "PATCH",
  });
};