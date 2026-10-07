require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { sequelize } = require("./models");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const likeRoutes = require("./routes/likeRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");
const followRoutes = require("./routes/followRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const groupRoutes = require("./routes/groupRoutes.js");
const savedPostRoutes = require(
  "./routes/savedPostRoutes.js"
);
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const socketAuthMiddleware = require("./middlewares/socketAuthMiddleware.js");
const messageService = require("./services/messageService.js");
const { setNotificationIO } = require("./utils/notificationSocket.js");
const groupMessageService = require("./services/groupMessageService.js");
const {
  addUser,
  removeUser,
  isUserOnline,
  getOnlineUsers,
} = require("./utils/presence.js");

// Express App
const app = express();

// Http Server
const httpServer = http.createServer(app);

// Socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],

    credentials: true,
  },
});
setNotificationIO(io);

// Port
const PORT = process.env.PORT;

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5500"],
    credentials: true,
  }),
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Upload
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SnapGrid API is running",
  });
});

// Authentication Route
app.use("/api/auth", authRoutes);

// User Route
app.use("/api/users", userRoutes);

// Post Route
app.use("/api/posts", postRoutes);

// Like Route
app.use("/api/likes", likeRoutes);

// comment Route
app.use("/api/comments", commentRoutes);

// follow Route
app.use("/api/follows", followRoutes);

// notification Route
app.use("/api/notifications", notificationRoutes);

// message Route
app.use("/api/message", messageRoutes);

// group Route
app.use("/api/groups", groupRoutes);

// saved Route
app.use(
  "/api/posts",
  savedPostRoutes
);

// Error Middleware
app.use(errorMiddleware);

// Socket authentication
io.use(socketAuthMiddleware);

// Socket connection
io.on("connection", (socket) => {
  // console.log(`User ${socket.userId} connected`);
    const userId = Number(socket.userId);
 console.log(
    `User ${userId} connected`
  );

  // USER PRIVATE ROOM

  // socket.join(`user_${socket.userId}`);

  socket.join(
    `user_${userId}`
  );

  // console.log(`User ${socket.userId} joined user room`);
  console.log(
    `User ${userId} joined user room`
  );

  // ==================================================
  // PRESENCE
  // ==================================================

  const wasAlreadyOnline =
    isUserOnline(userId);

  addUser(
    userId,
    socket.id
  );


  if (!wasAlreadyOnline) {
    io.emit("user_online", {
      userId,
    });
  }

  socket.on(
  "get_online_users",
  () => {
    socket.emit(
      "online_users",
      getOnlineUsers()
    );
  }
);

  // JOIN CONVERSATION

  socket.on("join_conversation", async ({ conversationId }) => {
    try {
      const conversation = await messageService.getAuthorizedConversation(
        conversationId,
        socket.userId,
      );

      const room = `conversation_${conversation.id}`;

      socket.join(room);

      console.log(`User ${socket.userId} joined ${room}`);

      socket.emit("conversation_joined", {
        conversationId: conversation.id,
      });
    } catch (error) {
      console.error("Join Conversation Error:", error.message);

      socket.emit("socket_error", {
        message: error.message,
      });
    }
  });

  socket.on("join_group", async ({ groupId }) => {
    try {
      const { group } = await groupMessageService.getAuthorizedGroup(
        groupId,
        socket.userId,
      );

      const room = `group_${group.id}`;

      socket.join(room);

      console.log(`User ${socket.userId} joined ${room}`);

      socket.emit("group_joined", {
        groupId: group.id,
      });
    } catch (error) {
      console.error("Join Group Error:", error.message);

      socket.emit("socket_error", {
        message: error.message,
      });
    }
  });

  // SEND MESSAGE
  socket.on("send_message", async ({ conversationId, content }) => {
    try {
      const message = await messageService.createMessage(
        conversationId,
        socket.userId,
        content,
      );

      const room = `conversation_${conversationId}`;

      io.to(room).emit("new_message", message);
    } catch (error) {
      console.error("Send Message Error:", error.message);

      socket.emit("socket_error", {
        message: error.message,
      });
    }
  });

  socket.on("send_group_message", async ({ groupId, content }) => {
    try {
      /*
        IMPORTANT:
        senderId comes from JWT/socket,
        NOT from frontend.
      */
      const message = await groupMessageService.createGroupMessage(
        groupId,
        socket.userId,
        content,
      );

      const room = `group_${groupId}`;

      /*
        Send to everyone in group.
      */
      io.to(room).emit("new_group_message", message);
    } catch (error) {
      console.error("Send Group Message Error:", error.message);

      socket.emit("socket_error", {
        message: error.message,
      });
    }
  });

  // DISCONNECT

  socket.on("disconnect", (reason) => {
    // console.log(`User ${socket.userId} disconnected`);
    console.log(
      `User ${userId} disconnected`
    );

    console.log(`Reason: ${reason}`);

    const becameOffline =
      removeUser(
        userId,
        socket.id
      );

      if (becameOffline) {
      io.emit("user_offline", {
        userId,
      });
    }
  });
});

// Server
const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully");

    // Sequelize CLI migrations are being used.
    // Do not use sequelize.sync() here.

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

      console.log(`Socket.IO running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed:", error.message);

    process.exit(1);
  }
};

startServer();
