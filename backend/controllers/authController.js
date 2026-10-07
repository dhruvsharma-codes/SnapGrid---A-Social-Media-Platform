const authService = require("../services/authService.js");

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Current User Fetched Succcessfully",
      data: {
        user: {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          fullName: req.user.fullName,
          bio: req.user.bio,
          profileImage: req.user.profileImage,
          coverImage: req.user.coverImage,
          followersCount: req.user.followersCount,
          followingCount: req.user.followingCount,
          postsCount: req.user.postsCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
