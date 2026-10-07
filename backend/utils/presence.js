"use strict";

const onlineUsers = new Map();

/*
  Map structure:

  userId -> Set of socket IDs

  Example:

  1 -> Set {
    "socket123",
    "socket456"
  }

  This is important because the same user
  can have multiple tabs/devices open.
*/


// ======================================================
// ADD USER SOCKET
// ======================================================

const addUser = (userId, socketId) => {
  userId = Number(userId);

  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }

  onlineUsers.get(userId).add(socketId);
};


// ======================================================
// REMOVE USER SOCKET
// ======================================================

const removeUser = (userId, socketId) => {
  userId = Number(userId);

  const sockets = onlineUsers.get(userId);

  if (!sockets) {
    return false;
  }

  sockets.delete(socketId);

  // User is offline only when
  // ALL sockets are disconnected
  if (sockets.size === 0) {
    onlineUsers.delete(userId);

    return true;
  }

  return false;
};


// ======================================================
// CHECK ONLINE
// ======================================================

const isUserOnline = (userId) => {
  userId = Number(userId);

  return onlineUsers.has(userId);
};


// ======================================================
// GET ONLINE USERS
// ======================================================

const getOnlineUsers = () => {
  return Array.from(
    onlineUsers.keys()
  );
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
  addUser,
  removeUser,
  isUserOnline,
  getOnlineUsers,
};