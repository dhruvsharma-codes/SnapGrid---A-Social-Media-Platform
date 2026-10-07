"use strict";

const savedPostService = require(
  "../services/savedPostService.js"
);

const savePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const savedPost =
      await savedPostService.savePost(
        req.user.id,
        postId
      );

    return res.status(201).json({
      success: true,
      message: "Post saved successfully",
      data: {
        savedPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

const unsavePost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    await savedPostService.unsavePost(
      req.user.id,
      postId
    );

    return res.status(200).json({
      success: true,
      message: "Post removed from saved posts",
    });
  } catch (error) {
    next(error);
  }
};

const getSaveStatus = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const status =
      await savedPostService.getSaveStatus(
        req.user.id,
        postId
      );

    return res.status(200).json({
      success: true,
      data: status,
    });
  } catch (error) {
    next(error);
  }
};

const getSavedPosts = async (req, res, next) => {
  try {
    const posts =
      await savedPostService.getSavedPosts(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      message: "Saved posts fetched successfully",
      data: {
        posts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  savePost,
  unsavePost,
  getSaveStatus,
  getSavedPosts,
};