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

export const sendMessage = async (conversationId, content) => {
  return fetchWithAuth(
    `/message/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
    }
  );
};