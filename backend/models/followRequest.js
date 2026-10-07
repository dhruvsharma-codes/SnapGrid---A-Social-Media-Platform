"use strict";

module.exports = (sequelize, DataTypes) => {
  const FollowRequest = sequelize.define(
    "FollowRequest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      tableName: "FollowRequests",

      indexes: [
        {
          unique: true,
          fields: ["senderId", "receiverId"],
        },
      ],
    },
  );

  FollowRequest.associate = (models) => {
    FollowRequest.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "sender",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    FollowRequest.belongsTo(models.User, {
      foreignKey: "receiverId",
      as: "receiver",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return FollowRequest;
};
