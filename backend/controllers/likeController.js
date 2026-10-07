const likeService = require("../services/likeService");

const toggleLike = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const result = await likeService.toggleLike(req.user.id, postId);

    return res.status(200).json({
      success: true,
      message: result.liked
        ? "Post liked successfully"
        : "Post unliked successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleLike,
};
