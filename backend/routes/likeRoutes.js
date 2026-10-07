const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/:postId", authMiddleware, likeController.toggleLike);

module.exports = router;
