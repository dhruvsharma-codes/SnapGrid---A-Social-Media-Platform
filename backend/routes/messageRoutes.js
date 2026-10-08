const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const chatUpload = require("../middlewares/chatUpload");

router.post(
  "/upload",
  authMiddleware,
  chatUpload.single("file"),
  messageController.uploadAttachment
);

router.get(
  "/conversations",
  authMiddleware,
  messageController.getMyConversations
);

// Create / get conversation
router.post(
  "/conversations/:userId",
  authMiddleware,
  messageController.getOrCreateConversation,
);

// Get messages
router.get(
  "/conversations/:conversationId",
  authMiddleware,
  messageController.getConversationMessages,
);

// Send message REST testing
router.post(
  "/conversations/:conversationId/messages",
  authMiddleware,
  messageController.createMessage,
);

module.exports = router;
