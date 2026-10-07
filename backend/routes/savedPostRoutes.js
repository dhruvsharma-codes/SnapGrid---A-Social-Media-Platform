"use strict";

const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middlewares/authMiddleware.js"
);

const {
  savePost,
  unsavePost,
  getSaveStatus,
  getSavedPosts,
} = require(
  "../controllers/savedPostController.js"
);

router.get(
  "/saved",
  authMiddleware,
  getSavedPosts
);

router.get(
  "/:postId/save-status",
  authMiddleware,
  getSaveStatus
);

router.post(
  "/:postId/save",
  authMiddleware,
  savePost
);

router.delete(
  "/:postId/save",
  authMiddleware,
  unsavePost
);

module.exports = router;