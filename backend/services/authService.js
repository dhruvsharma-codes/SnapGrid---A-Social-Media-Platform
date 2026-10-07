const { User } = require("../models/index.js");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

const formatUser = (user) => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    bio: user.bio,
    profileImage: user.profileImage,
    coverImage: user.coverImage,
  };
};

const register = async ({ username, email, password, fullName }) => {
  // Check Email
  const existingEmail = await User.findOne({
    where: { email },
  });

  if (existingEmail) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  // Check Username
  const existingUsername = await User.findOne({
    where: { username },
  });

  if (existingUsername) {
    const error = new Error("Username is already taken");
    error.statusCode = 409;
    throw error;
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create User
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    fullName,
  });

  // Generate Token
  const token = generateToken(user.id);

  return {
    token,
    user: formatUser(user),
  };
};

const login = async ({ email, password }) => {
  // Find User
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Compare Password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate Token
  const token = generateToken(user.id);

  return {
    token,
    user: formatUser(user),
  };
};


const changePassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  userId = Number(userId);

  // ==========================================
  // VALIDATION
  // ==========================================

  if (!currentPassword || !newPassword) {
    const error = new Error(
      "Current password and new password are required"
    );

    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error(
      "New password must be at least 6 characters"
    );

    error.statusCode = 400;
    throw error;
  }

  // ==========================================
  // FIND USER
  // ==========================================

  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("User not found");

    error.statusCode = 404;
    throw error;
  }

  // ==========================================
  // CHECK CURRENT PASSWORD
  // ==========================================

  const isCurrentPasswordValid =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!isCurrentPasswordValid) {
    const error = new Error(
      "Current password is incorrect"
    );

    error.statusCode = 400;
    throw error;
  }

  // ==========================================
  // CHECK SAME PASSWORD
  // ==========================================

  const isSamePassword =
    await bcrypt.compare(
      newPassword,
      user.password
    );

  if (isSamePassword) {
    const error = new Error(
      "New password must be different from current password"
    );

    error.statusCode = 400;
    throw error;
  }

  // ==========================================
  // HASH NEW PASSWORD
  // ==========================================

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12
  );

  // ==========================================
  // UPDATE PASSWORD
  // ==========================================

  user.password = hashedPassword;

  await user.save();

  return {
    success: true,
    message: "Password changed successfully",
  };
};


module.exports = { register, login, changePassword };
