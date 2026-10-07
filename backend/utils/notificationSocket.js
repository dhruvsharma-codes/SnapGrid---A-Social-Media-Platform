"use strict";

let io = null;

const setNotificationIO = (socketIO) => {
  io = socketIO;
};

const emitNotification = (
  receiverId,
  notification
) => {
  if (!io) {
    console.warn(
      "Notification Socket.IO is not initialized"
    );
    return;
  }

  io.to(`user_${receiverId}`).emit(
    "new_notification",
    notification
  );

  io.to(`user_${receiverId}`).emit(
    "notifications:changed"
  );
};

module.exports = {
  setNotificationIO,
  emitNotification,
};