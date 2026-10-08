"use strict";

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
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
      tableName: "likes",

      indexes: [
        {
          unique: true,
          fields: ["userId", "postId"],
        },
      ],
    },
  );

  Like.associate = (models) => {
    Like.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Like.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Like;
};
