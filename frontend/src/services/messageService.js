// import { fetchWithAuth } from "./api.js";


// export const getMyConversations = async () => {
//   return fetchWithAuth("/message/conversations");
// };

// export const getOrCreateConversation = async (userId) => {
//   return fetchWithAuth(`/message/conversations/${userId}`, {
//     method: "POST",
//   });
// };

// export const getConversationMessages = async (conversationId) => {
//   return fetchWithAuth(
//     `/message/conversations/${conversationId}`
//   );
// };

// // export const sendMessage = async (conversationId, content) => {
// //   return fetchWithAuth(
// //     `/message/conversations/${conversationId}/messages`,
// //     {
// //       method: "POST",
// //       body: JSON.stringify({ content }),
// //     }
// //   );
// // };

// export const sendMessage = async (
//   conversationId,
//   content,
//   attachment = {}
// ) => {
//   return await fetchWithAuth(
//     `/message/${conversationId}`,
//     {
//       method: "POST",
//       body: JSON.stringify({
//         content,

//         messageType:
//           attachment.messageType ||
//           "text",

//         attachmentUrl:
//           attachment.attachmentUrl ||
//           null,

//         attachmentName:
//           attachment.attachmentName ||
//           null,

//         attachmentMimeType:
//           attachment.attachmentMimeType ||
//           null,

//         attachmentSize:
//           attachment.attachmentSize ||
//           null,
//       }),
//     }
//   );
// };


// export const uploadMessageAttachment = async (file) => {
//   const token =
//     localStorage.getItem("token") ||
//     sessionStorage.getItem("token");

//   if (!token) {
//     throw new Error("Authentication token not found");
//   }

//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch(
//     "http://localhost:5000/api/message/upload",
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     }
//   );

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(
//       data.message || "File upload failed"
//     );
//   }

//   return data;
// };
















































import { fetchWithAuth } from "./api.js";

const id = encodeURIComponent;

// same limits the chat UI already enforces
const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export const getMyConversations = async () => {
  return fetchWithAuth("/message/conversations");
};

export const getOrCreateConversation = async (userId) => {
  return fetchWithAuth(`/message/conversations/${id(userId)}`, {
    method: "POST",
  });
};

export const getConversationMessages = async (conversationId) => {
  return fetchWithAuth(`/message/conversations/${id(conversationId)}`);
};

export const sendMessage = async (
  conversationId,
  content,
  attachment = {}
) => {
  const file = attachment || {};

  return await fetchWithAuth(`/message/${id(conversationId)}`, {
    method: "POST",
    body: JSON.stringify({
      content,
      messageType: file.messageType || "text",
      attachmentUrl: file.attachmentUrl || null,
      attachmentName: file.attachmentName || null,
      attachmentMimeType: file.attachmentMimeType || null,
      attachmentSize: file.attachmentSize || null,
    }),
  });
};

export const uploadMessageAttachment = async (file) => {
  // defence in depth: the server must validate too, but never send junk
  if (!(file instanceof Blob)) {
    throw new Error("No file selected");
  }

  if (file.size > MAX_ATTACHMENT_SIZE) {
    throw new Error("File size must be less than 5 MB");
  }

  if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, WEBP and PDF files are allowed");
  }

  const formData = new FormData();
  formData.append("file", file);

  // This used to call http://localhost:5000 directly, so uploads were
  // broken in production. It now uses the same API URL as everything else.
  return await fetchWithAuth("/message/upload", {
    method: "POST",
    body: formData,
    errorMessage: "File upload failed",
  });
};