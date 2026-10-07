const userService = require("../services/userService.js");

const getProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await userService.getProfileByUsername(username);

    return res.status(200).json({
      success: true,
      message: "Profile Fetched Successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(
      req.user.id,
      req.body,
      req.file,
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json({
        success: true,
        data: {
          users: [],
        },
      });
    }

    const users = await userService.searchUsers(q.trim());

    return res.status(200).json({
      success: true,
      message: "Users searched successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSuggestedUsers = async (req, res, next) => {
  try {
    const users =
      await userService.getSuggestedUsers(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: "Suggested users fetched successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile, searchUsers, getSuggestedUsers };
