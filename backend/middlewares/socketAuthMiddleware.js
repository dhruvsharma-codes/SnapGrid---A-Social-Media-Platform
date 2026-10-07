const jwt = require("jsonwebtoken");

const { User } = require("../models");

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.userId = user.id;

    socket.user = user;

    next();
  } catch (error) {
    console.error("Socket Auth Error:", error.message);

    next(new Error("Invalid or expired token"));
  }
};

module.exports = socketAuthMiddleware;
