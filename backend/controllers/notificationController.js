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



const markNotificationAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markNotificationAsRead(
      req.params.notificationId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: { notification },
    });
  } catch (error) {
    next(error);
  }
};

const markAllNotificationsAsRead = async (req, res, next) => {
  try {
    const updatedCount =
      await notificationService.markAllNotificationsAsRead(req.user.id);

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
      data: { updatedCount },
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead
};
