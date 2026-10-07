const messageService = require("../services/messageService.js");
const getOrCreateConversation = async (req, res, next) => {
  try {
    const conversation = await messageService.getOrCreateConversation(
      req.user.id,
      req.params.userId,
    );

    return res.status(200).json({
      success: true,

      data: {
        conversation,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getConversationMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getConversationMessages(
      req.params.conversationId,
      req.user.id,
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

const createMessage = async (req, res, next) => {
  try {
    const message = await messageService.createMessage(
      req.params.conversationId,
      req.user.id,
      req.body.content,
    );

    return res.status(201).json({
      success: true,

      message: "Message sent",

      data: {
        message,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMyConversations = async (req, res, next) => {
  try {
    const conversations =
      await messageService.getMyConversations(req.user.id);

    return res.status(200).json({
      success: true,
      data: { conversations },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrCreateConversation,
  getConversationMessages,
  createMessage,
  getMyConversations
};
