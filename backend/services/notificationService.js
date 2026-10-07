const { Notification, User } = require("../models");

const getNotifications = async (userId) => {
  return await Notification.findAll({
    where: {
      receiverId: userId,
    },

    include: [
      {
        model: User,
        as: "sender",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],

    order: [["createdAt", "DESC"]],
  });
};

const getUnreadNotificationCount = async (userId) => {
  return await Notification.count({
    where: {
      receiverId: userId,
      isRead: false,
    },
  });
};

module.exports = {
  getNotifications,
  getUnreadNotificationCount,
};
