const { User, Follow, FollowRequest } = require("../models");
const { Op } = require("sequelize");

const getProfileByUsername = async (username) => {
  const user = await User.findOne({
    where: { username },
    attributes: [
      "id",
      "username",
      "email",
      "fullName",
      "bio",
      "profileImage",
      "coverImage",
      "followersCount",
      "followingCount",
      "postsCount",
    ],
  });

  if (!user) {
    const error = new Error("user not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

const updateProfile = async (userId, { fullName, bio }, profileImage) => {
  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (fullName !== undefined) {
    user.fullName = fullName.trim();
  }

  if (bio !== undefined) {
    user.bio = bio.trim();
  }

  if (profileImage) {
    user.profileImage = `/uploads/profile/${profileImage.filename}`;
  }

  await user.save();

  return user;
};

const searchUsers = async (query) => {
  const users = await User.findAll({
    where: {
      [Op.or]: [
        {
          username: {
            [Op.like]: `%${query}%`,
          },
        },
        {
          fullName: {
            [Op.like]: `%${query}%`,
          },
        },
      ],
    },

    attributes: [
      "id",
      "username",
      "fullName",
      "profileImage",
      "bio",
      "followersCount",
      "followingCount",
      "postsCount",
    ],

    limit: 20,

    order: [["username", "ASC"]],
  });

  return users;
};


const getSuggestedUsers = async (userId) => {
  // Current user kin users ko already follow karta hai
  const following = await Follow.findAll({
    where: {
      followerId: userId,
    },
    attributes: ["followingId"],
  });

  const followingIds = following.map(
    (follow) => follow.followingId
  );

  // Current user ne jinhe request bheji hai
  const sentRequests = await FollowRequest.findAll({
    where: {
      senderId: userId,
      status: "pending",
    },
    attributes: ["receiverId"],
  });

  const sentRequestIds = sentRequests.map(
    (request) => request.receiverId
  );

  // Jin users ne current user ko request bheji hai
  const receivedRequests = await FollowRequest.findAll({
    where: {
      receiverId: userId,
      status: "pending",
    },
    attributes: ["senderId"],
  });

  const receivedRequestIds = receivedRequests.map(
    (request) => request.senderId
  );

  // In users ko suggestion mein nahi dikhana
  const excludedIds = [
    userId,
    ...followingIds,
    ...sentRequestIds,
    ...receivedRequestIds,
  ];

  const users = await User.findAll({
    where: {
      id: {
        [Op.notIn]: excludedIds,
      },
    },

    attributes: [
      "id",
      "username",
      "fullName",
      "profileImage",
      "bio",
      "followersCount",
      "followingCount",
      "postsCount",
    ],

    order: [
      ["followersCount", "DESC"],
    ],

    limit: 10,
  });

  return users;
};
module.exports = { getProfileByUsername, updateProfile, searchUsers, getSuggestedUsers };
