"use strict";

const { Op } = require("sequelize");
const { Conversation, Message, User } = require("../models");

const getOrCreateConversation = async (currentUserId, otherUserId) => {
  // Converted into number
  currentUserId = Number(currentUserId);
  otherUserId = Number(otherUserId);

  // Checked that you cannot chat with yourself
  if (currentUserId === otherUserId) {
    const error = new Error("You cannot create a conversation with yourself");
    error.statusCode = 400;
    throw error;
  }

  // Find other user
  const otherUser = await User.findByPk(otherUserId);

  if (!otherUser) {
    const error = new Error("User not found");
    error.stausCode = 404;
    throw error;
  }

  // Get user one id
  const userOneId = Math.min(currentUserId, otherUserId);

  // get user two id
  const userTwoId = Math.max(currentUserId, otherUserId);

  let conversation = await Conversation.findOne({
    where: { userOneId, userTwoId },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      userOneId,
      userTwoId,
    });
  }
  return conversation;
};

const getAuthorizedConversation = async (conversationId, userId) => {
  const conversation = await Conversation.findOne({
    where: {
      id: conversationId,
      [Op.or]: [
        {
          userOneId: userId,
        },
        {
          userTwoId: userId,
        },
      ],
    },
  });
  if (!conversation) {
    const error = new Error("Conversation not found or access denied");
    error.statusCode = 403;
    throw error;
  }

  return conversation;
};

const getConversationMessages = async (conversationId, currentUserId) => {
  await getAuthorizedConversation(conversationId, currentUserId);

  const messages = await Message.findAll({
    where: {
      conversationId,
    },
    include: [
      {
        model: User,
        as: "sender",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],
    order: [["createdAt", "ASC"]],
  });
  return messages;
};

const createMessage = async (conversationId, senderId, content) => {
  if (!content || !content.trim()) {
    const error = new Error("Message cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const conversation = await getAuthorizedConversation(
    conversationId,
    senderId,
  );
  const message = await Message.create({
    conversationId: conversation.id,
    senderId,
    content: content.trim(),
    isRead: false,
  });
  return await Message.findByPk(message.id, {
    include: [
      {
        model: User,
        as: "sender",

        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],
  });
};

const getMyConversations = async (currentUserId) => {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: [
        { userOneId: currentUserId },
        { userTwoId: currentUserId },
      ],
    },
    include: [
      {
        model: User,
        as: "userOne",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
      {
        model: User,
        as: "userTwo",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],
    order: [["updatedAt", "DESC"]],
  });

  const result = await Promise.all(
    conversations.map(async (conversation) => {
      const otherUser =
        Number(conversation.userOneId) === Number(currentUserId)
          ? conversation.userTwo
          : conversation.userOne;

      const lastMessage = await Message.findOne({
        where: { conversationId: conversation.id },
        attributes: ["id", "conversationId", "senderId", "content", "createdAt"],
        order: [["createdAt", "DESC"], ["id", "DESC"]],
      });

      return {
        id: conversation.id,
        userOneId: conversation.userOneId,
        userTwoId: conversation.userTwoId,
        otherUser,
        lastMessage,
        updatedAt: conversation.updatedAt,
      };
    })
  );

  // Latest activity first, including conversations with new messages.
  result.sort((a, b) => {
    const timeA = new Date(
      a.lastMessage?.createdAt || a.updatedAt
    ).getTime();

    const timeB = new Date(
      b.lastMessage?.createdAt || b.updatedAt
    ).getTime();

    return timeB - timeA;
  });

  return result;
};

module.exports = {
  getOrCreateConversation,
  getAuthorizedConversation,
  getConversationMessages,
  createMessage,
  getMyConversations
};
