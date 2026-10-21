// const { Notification, User } = require("../models");

// const getNotifications = async (userId) => {
//   return await Notification.findAll({
//     where: {
//       receiverId: userId,
//     },

//     include: [
//       {
//         model: User,
//         as: "sender",
//         attributes: ["id", "username", "fullName", "profileImage"],
//       },
//     ],

//     order: [["createdAt", "DESC"]],
//   });
// };

// const getUnreadNotificationCount = async (userId) => {
//   return await Notification.count({
//     where: {
//       receiverId: userId,
//       isRead: false,
//     },
//   });
// };

// module.exports = {
//   getNotifications,
//   getUnreadNotificationCount,
// };






























const { Notification, User } = require("../models");

const getNotifications = async (userId) => {
  return await Notification.findAll({
    where: { receiverId: userId },
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

const markNotificationAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOne({
    where: {
      id: notificationId,
      receiverId: userId,
    },
  });

  if (!notification) {
    const error = new Error("Notification not found");
    error.statusCode = 404;
    throw error;
  }

  if (!notification.isRead) {
    await notification.update({ isRead: true });
  }

  return notification;
};

const markAllNotificationsAsRead = async (userId) => {
  const [updatedCount] = await Notification.update(
    { isRead: true },
    {
      where: {
        receiverId: userId,
        isRead: false,
      },
    }
  );

  return updatedCount;
};

module.exports = {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
