const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const uploadProfileImage = require("../middlewares/uploadMiddleware.js");

router.get("/search", authMiddleware, userController.searchUsers);
router.get("/suggestions", authMiddleware, userController.getSuggestedUsers);
router.get("/:username", authMiddleware, userController.getProfile);
router.put(
  "/profile",
  authMiddleware,
  uploadProfileImage.single("profileImage"),
  userController.updateProfile,
);

module.exports = router;
