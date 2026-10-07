// const {
//   Follow,
//   FollowRequest,
//   User,
//   Notification,
//   sequelize,
// } = require("../models");
// const {
//   emitNotification,
// } = require("../utils/notificationSocket.js");

// // SEND FOLLOW REQUEST
// const sendFollowRequest = async (senderId, receiverId) => {
//   senderId = Number(senderId);
//   receiverId = Number(receiverId);

//   if (senderId === receiverId) {
//     const error = new Error("You cannot follow yourself");
//     error.statusCode = 400;
//     throw error;
//   }

//   const receiver = await User.findByPk(receiverId);

//   if (!receiver) {
//     const error = new Error("User not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   // Already following?
//   const existingFollow = await Follow.findOne({
//     where: {
//       followerId: senderId,
//       followingId: receiverId,
//     },
//   });

//   if (existingFollow) {
//     return {
//       status: "following",
//     };
//   }

//   // Existing request
//   let request = await FollowRequest.findOne({
//     where: {
//       senderId,
//       receiverId,
//     },
//   });

//   // Already requested
//   if (request?.status === "pending") {
//     return {
//       status: "requested",
//       requestId: request.id,
//     };
//   }

//   // Re-use rejected/cancelled request
//   if (request) {
//     request.status = "pending";
//     await request.save();
//   } else {
//     request = await FollowRequest.create({
//       senderId,
//       receiverId,
//       status: "pending",
//     });
//   }

//   // Create notification
//   const notification = 
//   await Notification.create({
//     senderId,
//     receiverId,
//     followRequestId: request.id,
//     type: "follow_request",
//     message: "sent you a follow request",
//     isRead: false,
//   });
//   emitNotification(
//   receiverId,
//   notification
// );

//   return {
//     status: "requested",
//     requestId: request.id,
//   };
// };

// // GET FOLLOW STATUS
// const getFollowStatus = async (currentUserId, profileUserId) => {
//   currentUserId = Number(currentUserId);
//   profileUserId = Number(profileUserId);

//   if (currentUserId === profileUserId) {
//     return {
//       status: "self",
//     };
//   }

//   // Following
//   const following = await Follow.findOne({
//     where: {
//       followerId: currentUserId,
//       followingId: profileUserId,
//     },
//   });

//   if (following) {
//     return {
//       status: "following",
//     };
//   }

//   // Requested
//   const request = await FollowRequest.findOne({
//     where: {
//       senderId: currentUserId,
//       receiverId: profileUserId,
//       status: "pending",
//     },
//   });

//   if (request) {
//     return {
//       status: "requested",
//       requestId: request.id,
//     };
//   }

//   return {
//     status: "follow",
//   };
// };

// // FOLLOW BACK
// const syncUserCounts = async (userId, transaction = null) => {
//   const followersCount = await Follow.count({
//     where: {
//       followingId: userId,
//     },
//     transaction,
//   });

//   const followingCount = await Follow.count({
//     where: {
//       followerId: userId,
//     },
//     transaction,
//   });

//   await User.update(
//     {
//       followersCount,
//       followingCount,
//     },
//     {
//       where: {
//         id: userId,
//       },
//       transaction,
//     },
//   );

//   return {
//     followersCount,
//     followingCount,
//   };
// };

// // const followBack = async (receiverId, requestId) => {
// //   receiverId = Number(receiverId);
// //   requestId = Number(requestId);

// //   const transaction = await sequelize.transaction();

// //   try {
// //     const request = await FollowRequest.findOne({
// //       where: {
// //         id: requestId,
// //         receiverId,
// //         status: "pending",
// //       },
// //       transaction,
// //       lock: transaction.LOCK.UPDATE,
// //     });

// //     if (!request) {
// //       const error = new Error("Follow request not found");
// //       error.statusCode = 404;
// //       throw error;
// //     }

// //     const senderId = Number(request.senderId);

// //     // ==========================================
// //     // A -> B
// //     // ==========================================

// //     const senderFollow = await Follow.findOne({
// //       where: {
// //         followerId: senderId,
// //         followingId: receiverId,
// //       },
// //       transaction,
// //     });

// //     if (!senderFollow) {
// //       await Follow.create(
// //         {
// //           followerId: senderId,
// //           followingId: receiverId,
// //         },
// //         {
// //           transaction,
// //         }
// //       );
// //     }

// //     // ==========================================
// //     // B -> A
// //     // ==========================================

// //     const receiverFollow = await Follow.findOne({
// //       where: {
// //         followerId: receiverId,
// //         followingId: senderId,
// //       },
// //       transaction,
// //     });

// //     if (!receiverFollow) {
// //       await Follow.create(
// //         {
// //           followerId: receiverId,
// //           followingId: senderId,
// //         },
// //         {
// //           transaction,
// //         }
// //       );
// //     }

// //     // ==========================================
// //     // Request accepted
// //     // ==========================================

// //     request.status = "accepted";

// //     await request.save({
// //       transaction,
// //     });

// //     // ==========================================
// //     // Calculate A counts
// //     // ==========================================

// //     const senderFollowingCount = await Follow.count({
// //       where: {
// //         followerId: senderId,
// //       },
// //       transaction,
// //     });

// //     const senderFollowersCount = await Follow.count({
// //       where: {
// //         followingId: senderId,
// //       },
// //       transaction,
// //     });

// //     // ==========================================
// //     // Calculate B counts
// //     // ==========================================

// //     const receiverFollowingCount = await Follow.count({
// //       where: {
// //         followerId: receiverId,
// //       },
// //       transaction,
// //     });

// //     const receiverFollowersCount = await Follow.count({
// //       where: {
// //         followingId: receiverId,
// //       },
// //       transaction,
// //     });

// //     // ==========================================
// //     // Update A
// //     // ==========================================

// //     await User.update(
// //       {
// //         followingCount: senderFollowingCount,
// //         followersCount: senderFollowersCount,
// //       },
// //       {
// //         where: {
// //           id: senderId,
// //         },
// //         transaction,
// //       }
// //     );

// //     // ==========================================
// //     // Update B
// //     // ==========================================

// //     await User.update(
// //       {
// //         followingCount: receiverFollowingCount,
// //         followersCount: receiverFollowersCount,
// //       },
// //       {
// //         where: {
// //           id: receiverId,
// //         },
// //         transaction,
// //       }
// //     );

// //     // ==========================================
// //     // Mark old notification as read
// //     // ==========================================

// //     await Notification.update(
// //       {
// //         isRead: true,
// //       },
// //       {
// //         where: {
// //           followRequestId: request.id,
// //           receiverId,
// //           type: "follow_request",
// //         },
// //         transaction,
// //       }
// //     );

// //     // ==========================================
// //     // Notification for sender
// //     // ==========================================

// //     await Notification.create(
// //       {
// //         senderId: receiverId,
// //         receiverId: senderId,
// //         followRequestId: request.id,
// //         type: "follow_accepted",
// //         message: "followed you back",
// //         isRead: false,
// //       },
// //       {
// //         transaction,
// //       }
// //     );

// //     await transaction.commit();

// //     return {
// //       status: "following",

// //       sender: {
// //         id: senderId,
// //         followersCount: senderFollowersCount,
// //         followingCount: senderFollowingCount,
// //       },

// //       receiver: {
// //         id: receiverId,
// //         followersCount: receiverFollowersCount,
// //         followingCount: receiverFollowingCount,
// //       },
// //     };
// //   } catch (error) {
// //     await transaction.rollback();
// //     throw error;
// //   }
// // };
// const followBack = async (receiverId, requestId) => {
//   receiverId = Number(receiverId);
//   requestId = Number(requestId);

//   const transaction = await sequelize.transaction();

//   try {
//     const request = await FollowRequest.findOne({
//       where: {
//         id: requestId,
//         receiverId,
//         status: "pending",
//       },
//       transaction,
//       lock: transaction.LOCK.UPDATE,
//     });

//     if (!request) {
//       const error = new Error("Follow request not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     const senderId = Number(request.senderId);

//     // A -> B
//     const senderFollow = await Follow.findOne({
//       where: {
//         followerId: senderId,
//         followingId: receiverId,
//       },
//       transaction,
//     });

//     if (!senderFollow) {
//       await Follow.create(
//         {
//           followerId: senderId,
//           followingId: receiverId,
//         },
//         { transaction },
//       );
//     }

//     // B -> A
//     const receiverFollow = await Follow.findOne({
//       where: {
//         followerId: receiverId,
//         followingId: senderId,
//       },
//       transaction,
//     });

//     if (!receiverFollow) {
//       await Follow.create(
//         {
//           followerId: receiverId,
//           followingId: senderId,
//         },
//         { transaction },
//       );
//     }

//     // Request accepted
//     request.status = "accepted";
//     await request.save({ transaction });

//     const senderCounts = await syncUserCounts(senderId, transaction);

//     const receiverCounts = await syncUserCounts(receiverId, transaction);

//     await Notification.destroy({
//       where: {
//         followRequestId: request.id,
//         type: "follow_request",
//       },
//       transaction,
//     });

//     // Send accepted notification to sender
//     await Notification.create(
//       {
//         senderId: receiverId,
//         receiverId: senderId,
//         followRequestId: request.id,
//         type: "follow_accepted",
//         message: "followed you back",
//         isRead: false,
//       },
//       { transaction },
//     );

//     await transaction.commit();

//     return {
//       status: "following",

//       sender: {
//         id: senderId,
//         ...senderCounts,
//       },

//       receiver: {
//         id: receiverId,
//         ...receiverCounts,
//       },
//     };
//   } catch (error) {
//     await transaction.rollback();
//     throw error;
//   }
// };

// // REJECT FOLLOW REQUEST
// const rejectFollowRequest = async (receiverId, requestId) => {
//   receiverId = Number(receiverId);
//   requestId = Number(requestId);

//   const request = await FollowRequest.findOne({
//     where: {
//       id: requestId,
//       receiverId,
//       status: "pending",
//     },
//   });

//   if (!request) {
//     const error = new Error("Follow request not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   request.status = "rejected";
//   await request.save();

//   // Delete ALL actionable notifications
//   await Notification.destroy({
//     where: {
//       followRequestId: request.id,
//       type: "follow_request",
//     },
//   });

//   return {
//     status: "rejected",
//   };
// };

// // EXPORT
// module.exports = {
//   sendFollowRequest,
//   getFollowStatus,
//   followBack,
//   rejectFollowRequest,
// };








"use strict";

const {
  Follow,
  FollowRequest,
  User,
  Notification,
  sequelize,
} = require("../models");

const {
  emitNotification,
} = require("../utils/notificationSocket.js");


// ======================================================
// SEND FOLLOW REQUEST
// ======================================================

const sendFollowRequest = async (
  senderId,
  receiverId
) => {
  senderId = Number(senderId);
  receiverId = Number(receiverId);

  // Cannot follow yourself
  if (senderId === receiverId) {
    const error = new Error(
      "You cannot follow yourself"
    );

    error.statusCode = 400;

    throw error;
  }

  // Check receiver exists
  const receiver =
    await User.findByPk(receiverId);

  if (!receiver) {
    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // ====================================================
  // Already following?
  // ====================================================

  const existingFollow =
    await Follow.findOne({
      where: {
        followerId: senderId,
        followingId: receiverId,
      },
    });

  if (existingFollow) {
    return {
      status: "following",
    };
  }

  // ====================================================
  // Existing request
  // ====================================================

  let request =
    await FollowRequest.findOne({
      where: {
        senderId,
        receiverId,
      },
    });

  // Already requested
  if (request?.status === "pending") {
    return {
      status: "requested",
      requestId: request.id,
    };
  }

  // ====================================================
  // Re-use rejected/cancelled request
  // ====================================================

  if (request) {
    request.status = "pending";

    await request.save();
  } else {
    request =
      await FollowRequest.create({
        senderId,
        receiverId,
        status: "pending",
      });
  }

  // ====================================================
  // Create notification
  // ====================================================

  const notificationRecord =
    await Notification.create({
      senderId,
      receiverId,
      followRequestId: request.id,
      type: "follow_request",
      message: "sent you a follow request",
      isRead: false,
    });

  // ====================================================
  // Get sender details
  // ====================================================

  const notification =
    await Notification.findByPk(
      notificationRecord.id,
      {
        include: [
          {
            model: User,
            as: "sender",
            attributes: [
              "id",
              "username",
              "fullName",
              "profileImage",
            ],
          },
        ],
      }
    );

  // ====================================================
  // Real-time notification
  // ====================================================

  emitNotification(
    receiverId,
    notification
  );

  // ====================================================
  // Response
  // ====================================================

  return {
    status: "requested",
    requestId: request.id,
  };
};


// ======================================================
// GET FOLLOW STATUS
// ======================================================

const getFollowStatus = async (
  currentUserId,
  profileUserId
) => {
  currentUserId = Number(currentUserId);
  profileUserId = Number(profileUserId);

  // Same user
  if (currentUserId === profileUserId) {
    return {
      status: "self",
    };
  }

  // ====================================================
  // Following
  // ====================================================

  const following =
    await Follow.findOne({
      where: {
        followerId: currentUserId,
        followingId: profileUserId,
      },
    });

  if (following) {
    return {
      status: "following",
    };
  }

  // ====================================================
  // Requested
  // ====================================================

  const request =
    await FollowRequest.findOne({
      where: {
        senderId: currentUserId,
        receiverId: profileUserId,
        status: "pending",
      },
    });

  if (request) {
    return {
      status: "requested",
      requestId: request.id,
    };
  }

  // ====================================================
  // Follow
  // ====================================================

  return {
    status: "follow",
  };
};


// ======================================================
// SYNC USER COUNTS
// ======================================================

const syncUserCounts = async (
  userId,
  transaction = null
) => {
  const followersCount =
    await Follow.count({
      where: {
        followingId: userId,
      },
      transaction,
    });

  const followingCount =
    await Follow.count({
      where: {
        followerId: userId,
      },
      transaction,
    });

  await User.update(
    {
      followersCount,
      followingCount,
    },
    {
      where: {
        id: userId,
      },
      transaction,
    }
  );

  return {
    followersCount,
    followingCount,
  };
};


// ======================================================
// FOLLOW BACK
// ======================================================

const followBack = async (
  receiverId,
  requestId
) => {
  receiverId = Number(receiverId);
  requestId = Number(requestId);

  const transaction =
    await sequelize.transaction();

  try {
    // ==================================================
    // Find pending request
    // ==================================================

    const request =
      await FollowRequest.findOne({
        where: {
          id: requestId,
          receiverId,
          status: "pending",
        },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

    if (!request) {
      const error = new Error(
        "Follow request not found"
      );

      error.statusCode = 404;

      throw error;
    }

    const senderId =
      Number(request.senderId);

    // ==================================================
    // A -> B
    // ==================================================

    const senderFollow =
      await Follow.findOne({
        where: {
          followerId: senderId,
          followingId: receiverId,
        },
        transaction,
      });

    if (!senderFollow) {
      await Follow.create(
        {
          followerId: senderId,
          followingId: receiverId,
        },
        {
          transaction,
        }
      );
    }

    // ==================================================
    // B -> A
    // ==================================================

    const receiverFollow =
      await Follow.findOne({
        where: {
          followerId: receiverId,
          followingId: senderId,
        },
        transaction,
      });

    if (!receiverFollow) {
      await Follow.create(
        {
          followerId: receiverId,
          followingId: senderId,
        },
        {
          transaction,
        }
      );
    }

    // ==================================================
    // Request accepted
    // ==================================================

    request.status = "accepted";

    await request.save({
      transaction,
    });

    // ==================================================
    // Sync sender counts
    // ==================================================

    const senderCounts =
      await syncUserCounts(
        senderId,
        transaction
      );

    // ==================================================
    // Sync receiver counts
    // ==================================================

    const receiverCounts =
      await syncUserCounts(
        receiverId,
        transaction
      );

    // ==================================================
    // Delete old follow request notification
    // ==================================================

    await Notification.destroy({
      where: {
        followRequestId: request.id,
        type: "follow_request",
      },
      transaction,
    });

    // ==================================================
    // Create accepted notification
    // ==================================================

    const notificationRecord =
      await Notification.create(
        {
          senderId: receiverId,
          receiverId: senderId,
          followRequestId: request.id,
          type: "follow_accepted",
          message: "followed you back",
          isRead: false,
        },
        {
          transaction,
        }
      );

    // ==================================================
    // IMPORTANT:
    // Fetch notification with sender details
    // ==================================================

    const notification =
      await Notification.findByPk(
        notificationRecord.id,
        {
          include: [
            {
              model: User,
              as: "sender",
              attributes: [
                "id",
                "username",
                "fullName",
                "profileImage",
              ],
            },
          ],
          transaction,
        }
      );

    // ==================================================
    // Commit transaction FIRST
    // ==================================================

    await transaction.commit();

    // ==================================================
    // Send real-time notification AFTER commit
    // ==================================================

    emitNotification(
      senderId,
      notification
    );

    // ==================================================
    // Response
    // ==================================================

    return {
      status: "following",

      sender: {
        id: senderId,
        ...senderCounts,
      },

      receiver: {
        id: receiverId,
        ...receiverCounts,
      },
    };

  } catch (error) {

    await transaction.rollback();

    throw error;
  }
};


// ======================================================
// REJECT FOLLOW REQUEST
// ======================================================

const rejectFollowRequest = async (
  receiverId,
  requestId
) => {
  receiverId = Number(receiverId);
  requestId = Number(requestId);

  // ====================================================
  // Find pending request
  // ====================================================

  const request =
    await FollowRequest.findOne({
      where: {
        id: requestId,
        receiverId,
        status: "pending",
      },
    });

  if (!request) {
    const error = new Error(
      "Follow request not found"
    );

    error.statusCode = 404;

    throw error;
  }

  // ====================================================
  // Mark request rejected
  // ====================================================

  request.status = "rejected";

  await request.save();

  // ====================================================
  // Delete actionable notifications
  // ====================================================

  await Notification.destroy({
    where: {
      followRequestId: request.id,
      type: "follow_request",
    },
  });

  // ====================================================
  // Response
  // ====================================================

  return {
    status: "rejected",
  };
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
  sendFollowRequest,
  getFollowStatus,
  followBack,
  rejectFollowRequest,
};