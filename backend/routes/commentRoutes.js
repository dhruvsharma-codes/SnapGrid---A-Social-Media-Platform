const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/:postId", authMiddleware, commentController.createComment);
router.get("/:postId", authMiddleware, commentController.getPostComments);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

module.exports = router;
