"use strict";

const {
  Group,
  GroupMember,
  GroupMessage,
  User,
} = require("../models");


/*
  Check whether user is a member of group.
*/
const getAuthorizedGroup = async (
  groupId,
  userId
) => {
  const group = await Group.findByPk(groupId);

  if (!group) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  const membership =
    await GroupMember.findOne({
      where: {
        groupId,
        userId,
      },
    });

  if (!membership) {
    const error = new Error(
      "You are not a member of this group"
    );

    error.statusCode = 403;

    throw error;
  }

  return {
    group,
    membership,
  };
};


/*
  Get old group messages.
*/
const getGroupMessages = async (
  groupId,
  currentUserId
) => {
  await getAuthorizedGroup(
    groupId,
    currentUserId
  );

  const messages =
    await GroupMessage.findAll({
      where: {
        groupId,
      },

      include: [
        {
          model: User,
          as: "sender",

          attributes: [
            "id",
            "username",
            "fullName",
            "profileImage",
          ],
        },
      ],

      order: [
        ["createdAt", "ASC"],
        ["id", "ASC"],
      ],
    });

  return messages;
};


/*
  Create a group message.
*/
const createGroupMessage = async (
  groupId,
  senderId,
  content
) => {
  /*
    IMPORTANT:
    This checks that sender is actually
    a member of this group.
  */
  await getAuthorizedGroup(
    groupId,
    senderId
  );

  if (!content || !content.trim()) {
    const error = new Error(
      "Message cannot be empty"
    );

    error.statusCode = 400;

    throw error;
  }

  const cleanContent = content.trim();

  if (cleanContent.length > 5000) {
    const error = new Error(
      "Message cannot exceed 5000 characters"
    );

    error.statusCode = 400;

    throw error;
  }

  const message =
    await GroupMessage.create({
      groupId,
      senderId,
      content: cleanContent,
    });

  /*
    Return sender details with message.
  */
  return await GroupMessage.findByPk(
    message.id,
    {
      include: [
        {
          model: User,
          as: "sender",

          attributes: [
            "id",
            "username",
            "fullName",
            "profileImage",
          ],
        },
      ],
    }
  );
};


module.exports = {
  getAuthorizedGroup,
  getGroupMessages,
  createGroupMessage,
};