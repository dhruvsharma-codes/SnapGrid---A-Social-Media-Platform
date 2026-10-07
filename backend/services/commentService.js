const { Comment, Post, User } = require("../models");

const createComment = async (userId, postId, content) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  if (!content || !content.trim()) {
    const error = new Error("Comment cannot be empty");
    error.statusCode = 400;
    throw error;
  }

  const comment = await Comment.create({
    userId,
    postId,
    content: content.trim(),
  });

  const createdComment = await Comment.findByPk(comment.id, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],
  });

  return createdComment;
};

const getPostComments = async (postId) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const comments = await Comment.findAll({
    where: {
      postId,
    },

    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],

    order: [["createdAt", "DESC"]],
  });

  return comments;
};

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    const error = new Error("Comment not found");
    error.statusCode = 404;
    throw error;
  }

  if (comment.userId !== userId) {
    const error = new Error("You are not allowed to delete this comment");

    error.statusCode = 403;
    throw error;
  }

  await comment.destroy();

  return true;
};

module.exports = { createComment, getPostComments, deleteComment };
