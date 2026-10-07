"use strict";

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js");
const uploadPostImage = require("../middlewares/postUploadMiddleware.js");
const postController = require("../controllers/postController");

router.post(
  "/",
  authMiddleware,
  uploadPostImage.single("image"),
  postController.createPost,
);
router.get("/feed", authMiddleware, postController.getFeedPosts);
router.get(
  "/user/:username",
  authMiddleware,
  postController.getPostsByUsername,
);
router.get("/:id", authMiddleware, postController.getPostById);
router.put(
  "/:id",
  authMiddleware,
  uploadPostImage.single("image"),
  postController.updatePost,
);
router.delete("/:id", authMiddleware, postController.deletePost);

module.exports = router;
