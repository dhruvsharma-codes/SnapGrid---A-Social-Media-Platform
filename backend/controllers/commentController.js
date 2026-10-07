const commentService = require("../services/commentService");

const createComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const comment = await commentService.createComment(
      req.user.id,
      postId,
      content,
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: {
        comment,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPostComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await commentService.getPostComments(postId);

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: {
        comments,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    await commentService.deleteComment(commentId, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createComment, getPostComments, deleteComment };
