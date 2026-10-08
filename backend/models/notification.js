"use strict";

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
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

      followRequestId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      type: {
        type: DataTypes.ENUM("follow_request", "follow_accepted"),
        allowNull: false,
      },

      message: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "notifications",
    },
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "sender",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Notification.belongsTo(models.User, {
      foreignKey: "receiverId",
      as: "receiver",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Notification.belongsTo(models.FollowRequest, {
      foreignKey: "followRequestId",
      as: "followRequest",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Notification;
};
