"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      caption: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: "",
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      tableName: "Posts",
    },
  );

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Post.hasMany(models.Like, {
      foreignKey: "postId",
      as: "likes",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Post.hasMany(models.SavedPost, {
  foreignKey: "postId",
  as: "savedPosts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
  };

  return Post;
};
