"use strict";

const groupMessageService =
  require("../services/groupMessageService.js");


/*
  GET /api/groups/:groupId/messages
*/
const getGroupMessages = async (
  req,
  res,
  next
) => {
  try {
    const messages =
      await groupMessageService.getGroupMessages(
        req.params.groupId,
        req.user.id
      );

    return res.status(200).json({
      success: true,

      data: {
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};


/*
  POST /api/groups/:groupId/messages
*/
const createGroupMessage = async (
  req,
  res,
  next
) => {
  try {
    const message =
      await groupMessageService.createGroupMessage(
        req.params.groupId,
        req.user.id,
        req.body.content
      );

    return res.status(201).json({
      success: true,

      message: "Group message created",

      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getGroupMessages,
  createGroupMessage,
};