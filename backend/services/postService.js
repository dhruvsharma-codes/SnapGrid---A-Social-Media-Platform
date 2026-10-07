"use strict";

const fs = require("fs");
const path = require("path");

const { Post, User, Like, Comment, SavedPost } = require("../models");

const createPost = async (userId, caption, image) => {
  const user = await User.findByPk(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!caption && !image) {
    const error = new Error("Post must contain caption or image");

    error.statusCode = 400;

    throw error;
  }

  const post = await Post.create({
    userId,
    caption: caption ? caption.trim() : "",
    image: image ? `/uploads/posts/${image.filename}` : "",
  });

  const totalPosts = await Post.count({
    where: {
      userId: userId,
    },
  });

  await User.update(
    {
      postsCount: totalPosts,
    },
    {
      where: {
        id: userId,
      },
    },
  );
  return post;
};

const getPostById = async (postId) => {
  const post = await Post.findByPk(postId, {
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],
  });

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  return post;
};

// const getPostsByUsername = async (username) => {
//   const user = await User.findOne({
//     where: {
//       username,
//     },
//   });

//   if (!user) {
//     const error = new Error("User not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   const posts = await Post.findAll({
//     where: {
//       userId: user.id,
//     },

//     include: [
//       {
//         model: User,
//         as: "user",
//         attributes: ["id", "username", "fullName", "profileImage"],
//       },
//     ],

//     order: [["createdAt", "DESC"]],
//   });

//   return posts;
// };

const getPostsByUsername = async (username, userId) => {
  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const posts = await Post.findAll({
    where: {
      userId: user.id,
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

  return await addLikeData(posts, userId);
};

const updatePost = async (postId, userId, caption, image) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  // Check ownership
  if (post.userId !== userId) {
    const error = new Error("You are not allowed to update this post");

    error.statusCode = 403;
    throw error;
  }

  // Update caption if provided
  if (caption !== undefined) {
    post.caption = caption.trim();
  }

  // Update image if new image provided
  if (image) {
    post.image = `/uploads/posts/${image.filename}`;
  }

  // Prevent empty post
  if (!post.caption?.trim() && !post.image) {
    const error = new Error("Post must contain caption or image");

    error.statusCode = 400;
    throw error;
  }

  await post.save();

  return post;
};

// const deletePost = async (postId, userId) => {

//   const post = await Post.findByPk(postId);

//   if (!post) {
//     const error = new Error("Post not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   // Check ownership
//   if (post.userId !== userId) {
//     const error = new Error("You are not allowed to delete this post");

//     error.statusCode = 403;
//     throw error;
//   }

//   // Store image path before deleting database record
//   const imagePath = post.image;

//   // Delete post from database
//   await post.destroy();

//   // Delete physical image
//   if (imagePath) {
//     const filePath = path.join(__dirname, "..", imagePath);

//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }
//   }

//   // Decrease user's post count
//   const user = await User.findByPk(userId);

//   if (user && user.postsCount > 0) {
//     await user.decrement("postsCount");
//   }

//   return true;
// };

const deletePost = async (postId, userId) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  // Check ownership
  if (post.userId !== userId) {
    const error = new Error("You are not allowed to delete this post");

    error.statusCode = 403;
    throw error;
  }

  // Store image path before deleting post
  const imagePath = post.image;

  // Delete post from database
  await post.destroy();

  // Delete physical image
  if (imagePath) {
    const filePath = path.join(__dirname, "..", imagePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  // Get actual post count from Posts table
  const totalPosts = await Post.count({
    where: {
      userId: userId,
    },
  });

  // Update Users.postsCount
  await User.update(
    {
      postsCount: totalPosts,
    },
    {
      where: {
        id: userId,
      },
    },
  );

  return true;
};

// const getFeedPosts = async (page = 1, limit = 10) => {
//   const offset = (page - 1) * limit;

//   const { count, rows } = await Post.findAndCountAll({
//     include: [
//       {
//         model: User,
//         as: "user",
//         attributes: ["id", "username", "fullName", "profileImage"],
//       },
//     ],

//     order: [["createdAt", "DESC"]],

//     limit,
//     offset,
//   });

//   return {
//     posts: rows,
//     pagination: {
//       currentPage: page,
//       totalPages: Math.ceil(count / limit),
//       totalPosts: count,
//       postsPerPage: limit,
//       hasNextPage: page < Math.ceil(count / limit),
//       hasPreviousPage: page > 1,
//     },
//   };
// };

const getFeedPosts = async (page = 1, limit = 10, userId) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Post.findAndCountAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "username", "fullName", "profileImage"],
      },
    ],

    order: [["createdAt", "DESC"]],

    limit,
    offset,
  });

  const posts = await addLikeData(rows, userId);

  return {
    posts,

    pagination: {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalPosts: count,
      postsPerPage: limit,
      hasNextPage: page < Math.ceil(count / limit),
      hasPreviousPage: page > 1,
    },
  };
};

// const addLikeData = async (posts, userId) => {
//   return Promise.all(
//     posts.map(async (post) => {
//       const likeCount = await Like.count({
//         where: {
//           postId: post.id,
//         },
//       });

//       const userLike = await Like.findOne({
//         where: {
//           postId: post.id,
//           userId,
//         },
//       });

//       const postData = post.toJSON();

//       return {
//         ...postData,
//         likeCount,
//         isLiked: !!userLike,
//       };
//     })
//   );
// };

// const addLikeData = async (posts, userId) => {
//   return Promise.all(
//     posts.map(async (post) => {
//       const likeCount = await Like.count({
//         where: {
//           postId: post.id,
//         },
//       });

//       const userLike = await Like.findOne({
//         where: {
//           postId: post.id,
//           userId,
//         },
//       });

//       const commentCount = await Comment.count({
//         where: {
//           postId: post.id,
//         },
//       });

//       const postData = post.toJSON();

//       return {
//         ...postData,
//         likeCount,
//         isLiked: !!userLike,
//         commentCount,
//       };
//     }),
//   );
// };


// const addLikeData = async (posts, userId) => {
//   // Get all saved posts of current user
//   const savedPosts = await SavedPost.findAll({
//     where: {
//       userId,
//     },
//     attributes: ["postId"],
//   });

//   const savedPostIds = new Set(
//     savedPosts.map((savedPost) =>
//       Number(savedPost.postId)
//     )
//   );

//   return Promise.all(
//     posts.map(async (post) => {
//       const likeCount = await Like.count({
//         where: {
//           postId: post.id,
//         },
//       });

//       const userLike = await Like.findOne({
//         where: {
//           postId: post.id,
//           userId,
//         },
//       });

//       const commentCount = await Comment.count({
//         where: {
//           postId: post.id,
//         },
//       });

//       const postData = post.toJSON();

//       return {
//         ...postData,

//         likeCount,
//         isLiked: !!userLike,
//         commentCount,

//         // ⭐ Important
//         isSaved: savedPostIds.has(
//           Number(post.id)
//         ),
//       };
//     })
//   );
// };


const addLikeData = async (posts, userId) => {
  const savedPosts = await SavedPost.findAll({
    where: {
      userId,
    },
    attributes: ["postId"],
  });

  const savedPostIds = new Set(
    savedPosts.map((savedPost) =>
      Number(savedPost.postId)
    )
  );

  return Promise.all(
    posts.map(async (post) => {
      const likeCount = await Like.count({
        where: {
          postId: post.id,
        },
      });

      const userLike = await Like.findOne({
        where: {
          postId: post.id,
          userId,
        },
      });

      const commentCount = await Comment.count({
        where: {
          postId: post.id,
        },
      });

      const postData = post.toJSON();

      return {
        ...postData,
        likeCount,
        isLiked: !!userLike,
        commentCount,
        isSaved: savedPostIds.has(
          Number(post.id)
        ),
      };
    })
  );
};

module.exports = {
  createPost,
  getPostById,
  getPostsByUsername,
  updatePost,
  deletePost,
  getFeedPosts,
};
