"use strict";

module.exports = (sequelize, DataTypes) => {
  const GroupMessage = sequelize.define(
    "GroupMessage",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "groupmessages",
    }
  );

  GroupMessage.associate = (models) => {
    GroupMessage.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupMessage.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "sender",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupMessage;
};