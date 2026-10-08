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
const uploadAttachment = async (
  req,
  res,
  next
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a file",
      });
    }

    const isImage =
      req.file.mimetype.startsWith("image/");

    const messageType = isImage
      ? "image"
      : "file";

    const attachmentUrl =
      `/uploads/chat/${req.file.filename}`;

    return res.status(200).json({
      success: true,

      message: "File uploaded successfully",

      data: {
        messageType,

        attachmentUrl,

        attachmentName:
          req.file.originalname,

        attachmentMimeType:
          req.file.mimetype,

        attachmentSize:
          req.file.size,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrCreateConversation,
  getConversationMessages,
  createMessage,
  getMyConversations,
  uploadAttachment
};
