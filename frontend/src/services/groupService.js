// import { fetchWithAuth } from "./api.js";

// export const createGroup = async (name, memberIds) => {
//   return await fetchWithAuth("/groups", {
//     method: "POST",
//     body: JSON.stringify({
//       name,
//       memberIds,
//     }),
//   });
// };

// export const getMyGroups = async () => {
//   return await fetchWithAuth("/groups");
// };

// export const getGroupDetails = async (groupId) => {
//   return await fetchWithAuth(`/groups/${groupId}`);
// };

// export const addGroupMembers = async (
//   groupId,
//   userIds
// ) => {
//   return await fetchWithAuth(
//     `/groups/${groupId}/members`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         userIds,
//       }),
//     }
//   );
// };

// export const getGroupMessages = async (
//   groupId
// ) => {
//   return await fetchWithAuth(
//     `/groups/${groupId}/messages`
//   );
// };

// export const sendGroupMessage = async (
//   groupId,
//   content
// ) => {
//   return await fetchWithAuth(
//     `/groups/${groupId}/messages`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         content,
//       }),
//     }
//   );
// };


// export const removeGroupMember = async (
//   groupId,
//   userId
// ) => {
//   return await fetchWithAuth(
//     `/groups/${groupId}/members/${userId}`,
//     {
//       method: "DELETE",
//     }
//   );
// };
































import { fetchWithAuth } from "./api.js";

const id = encodeURIComponent;

export const createGroup = async (name, memberIds) => {
  return await fetchWithAuth("/groups", {
    method: "POST",
    body: JSON.stringify({
      name,
      memberIds,
    }),
  });
};

export const getMyGroups = async () => {
  return await fetchWithAuth("/groups");
};

export const getGroupDetails = async (groupId) => {
  return await fetchWithAuth(`/groups/${id(groupId)}`);
};

export const addGroupMembers = async (groupId, userIds) => {
  return await fetchWithAuth(`/groups/${id(groupId)}/members`, {
    method: "POST",
    body: JSON.stringify({
      userIds,
    }),
  });
};

export const getGroupMessages = async (groupId) => {
  return await fetchWithAuth(`/groups/${id(groupId)}/messages`);
};

export const sendGroupMessage = async (groupId, content) => {
  return await fetchWithAuth(`/groups/${id(groupId)}/messages`, {
    method: "POST",
    body: JSON.stringify({
      content,
    }),
  });
};

export const removeGroupMember = async (groupId, userId) => {
  return await fetchWithAuth(`/groups/${id(groupId)}/members/${id(userId)}`, {
    method: "DELETE",
  });
};