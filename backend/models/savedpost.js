"use strict";

module.exports = (sequelize, DataTypes) => {
  const SavedPost = sequelize.define(
    "SavedPost",
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

      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "SavedPosts",
      indexes: [
        {
          unique: true,
          fields: ["userId", "postId"],
        },
      ],
    }
  );

  SavedPost.associate = (models) => {
    SavedPost.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    SavedPost.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return SavedPost;
};