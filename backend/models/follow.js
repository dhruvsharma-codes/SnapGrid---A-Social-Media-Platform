"use strict";

module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "follows",

      indexes: [
        {
          unique: true,
          fields: ["followerId", "followingId"],
        },
      ],
    },
  );

  Follow.associate = (models) => {
    Follow.belongsTo(models.User, {
      foreignKey: "followerId",
      as: "follower",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Follow.belongsTo(models.User, {
      foreignKey: "followingId",
      as: "following",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Follow;
};
