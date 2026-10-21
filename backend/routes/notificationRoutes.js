const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.get("/", authMiddleware, notificationController.getNotifications);
router.get(
  "/unread-count",
  authMiddleware,
  notificationController.getUnreadNotificationCount,
);
router.patch(
  "/read-all",
  protect,
  notificationController.markAllNotificationsAsRead
);
router.patch(
  "/:notificationId/read",
  protect,
  notificationController.markNotificationAsRead
);


module.exports = router;
