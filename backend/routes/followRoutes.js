const express = require("express");
const router = express.Router();
const followController = require("../controllers/followController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/request/:userId",
  authMiddleware,
  followController.sendFollowRequest,
);

router.get("/status/:userId", authMiddleware, followController.getFollowStatus);

router.post(
  "/follow-back/:requestId",
  authMiddleware,
  followController.followBack,
);

router.post(
  "/reject/:requestId",
  authMiddleware,
  followController.rejectFollowRequest,
);

module.exports = router;
