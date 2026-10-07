const followService = require("../services/followService");

const sendFollowRequest = async (req, res, next) => {
  try {
    const result = await followService.sendFollowRequest(
      req.user.id,
      req.params.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Follow request sent",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getFollowStatus = async (req, res, next) => {
  try {
    const result = await followService.getFollowStatus(
      req.user.id,
      req.params.userId,
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const followBack = async (req, res, next) => {
  try {
    const result = await followService.followBack(
      req.user.id,
      req.params.requestId,
    );

    return res.status(200).json({
      success: true,
      message: "Follow back successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const rejectFollowRequest = async (req, res, next) => {
  try {
    const result = await followService.rejectFollowRequest(
      req.user.id,
      req.params.requestId,
    );

    return res.status(200).json({
      success: true,
      message: "Follow request rejected",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendFollowRequest,
  getFollowStatus,
  followBack,
  rejectFollowRequest,
};
