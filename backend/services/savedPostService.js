"use strict";

const {
  SavedPost,
  Post,
  User,
} = require("../models");

const savePost = async (userId, postId) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const existing = await SavedPost.findOne({
    where: {
      userId,
      postId,
    },
  });

  if (existing) {
    const error = new Error("Post already saved");
    error.statusCode = 400;
    throw error;
  }

  const savedPost = await SavedPost.create({
    userId,
    postId,
  });

  return savedPost;
};

const unsavePost = async (userId, postId) => {
  const savedPost = await SavedPost.findOne({
    where: {
      userId,
      postId,
    },
  });

  if (!savedPost) {
    const error = new Error("Post is not saved");
    error.statusCode = 404;
    throw error;
  }

  await savedPost.destroy();

  return true;
};

const getSaveStatus = async (userId, postId) => {
  const savedPost = await SavedPost.findOne({
    where: {
      userId,
      postId,
    },
  });

  return {
    saved: Boolean(savedPost),
  };
};

const getSavedPosts = async (userId) => {
  const savedPosts = await SavedPost.findAll({
    where: {
      userId,
    },

    include: [
      {
        model: Post,
        as: "post",

        include: [
          {
            model: User,
            as: "user",

            attributes: [
              "id",
              "username",
              "fullName",
              "profileImage",
            ],
          },
        ],
      },
    ],

    order: [["createdAt", "DESC"]],
  });

  return savedPosts;
};

module.exports = {
  savePost,
  unsavePost,
  getSaveStatus,
  getSavedPosts,
};