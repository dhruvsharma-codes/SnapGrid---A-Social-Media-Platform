"use strict";

const postService = require("../services/postService");

const createPost = async (req, res, next) => {
  try {
    const { caption } = req.body;

    const post = await postService.createPost(req.user.id, caption, req.file);

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await postService.getPostById(id);

    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};

// const getPostsByUsername = async (req, res, next) => {
//   try {
//     const { username } = req.params;

//     const posts = await postService.getPostsByUsername(
//       username
//     );

//     return res.status(200).json({
//       success: true,
//       message: "User posts fetched successfully",
//       data: {
//         posts,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getPostsByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;

    const posts = await postService.getPostsByUsername(username, req.user.id);

    return res.status(200).json({
      success: true,
      message: "User posts fetched successfully",
      data: { posts },
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { caption } = req.body;

    const post = await postService.updatePost(
      id,
      req.user.id,
      caption,
      req.file,
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: {
        post,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await postService.deletePost(id, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// const getFeedPosts = async (req, res, next) => {
//   try {
//     let { page = 1, limit = 10 } = req.query;

//     page = parseInt(page);
//     limit = parseInt(limit);

//     if (page < 1) {
//       page = 1;
//     }

//     if (limit < 1 || limit > 50) {
//       limit = 10;
//     }

//     const result = await postService.getFeedPosts(
//       page,
//       limit
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Feed posts fetched successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const getFeedPosts = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if (page < 1) {
      page = 1;
    }

    if (limit < 1 || limit > 50) {
      limit = 10;
    }

    const result = await postService.getFeedPosts(page, limit, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Feed posts fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPostById,
  getPostsByUsername,
  updatePost,
  deletePost,
  getFeedPosts,
};
