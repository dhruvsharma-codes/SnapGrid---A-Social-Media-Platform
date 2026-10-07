const { Like, Post } = require("../models");

const toggleLike = async (userId, postId) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const existingLike = await Like.findOne({
    where: {
      userId,
      postId,
    },
  });

  if (existingLike) {
    await existingLike.destroy();

    const likeCount = await Like.count({
      where: { postId },
    });

    return {
      liked: false,
      likeCount,
    };
  }

  await Like.create({
    userId,
    postId,
  });

  const likeCount = await Like.count({
    where: { postId },
  });

  return {
    liked: true,
    likeCount,
  };
};

module.exports = {
  toggleLike,
};
