import { fetchWithAuth } from "./api.js";


export const getMyConversations = async () => {
  return fetchWithAuth("/message/conversations");
};

export const getOrCreateConversation = async (userId) => {
  return fetchWithAuth(`/message/conversations/${userId}`, {
    method: "POST",
  });
};

export const getConversationMessages = async (conversationId) => {
  return fetchWithAuth(
    `/message/conversations/${conversationId}`
  );
};

// export const sendMessage = async (conversationId, content) => {
//   return fetchWithAuth(
//     `/message/conversations/${conversationId}/messages`,
//     {
//       method: "POST",
//       body: JSON.stringify({ content }),
//     }
//   );
// };

export const sendMessage = async (
  conversationId,
  content,
  attachment = {}
) => {
  return await fetchWithAuth(
    `/message/${conversationId}`,
    {
      method: "POST",
      body: JSON.stringify({
        content,

        messageType:
          attachment.messageType ||
          "text",

        attachmentUrl:
          attachment.attachmentUrl ||
          null,

        attachmentName:
          attachment.attachmentName ||
          null,

        attachmentMimeType:
          attachment.attachmentMimeType ||
          null,

        attachmentSize:
          attachment.attachmentSize ||
          null,
      }),
    }
  );
};


export const uploadMessageAttachment = async (file) => {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "http://localhost:5000/api/message/upload",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "File upload failed"
    );
  }

  return data;
};