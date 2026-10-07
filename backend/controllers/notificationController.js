const notificationService = require("../services/notificationService.js");

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getNotifications(
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",

      data: {
        notifications,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUnreadNotificationCount = async (req, res, next) => {
  try {
    const count = await notificationService.getUnreadNotificationCount(
      req.user.id,
    );

    return res.status(200).json({
      success: true,

      data: {
        count,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  getUnreadNotificationCount,
};
