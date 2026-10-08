"use strict";

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      conversationId: {
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

       messageType: {
        type: DataTypes.ENUM(
          "text",
          "image",
          "file"
        ),
        allowNull: false,
        defaultValue: "text",
      },

      attachmentUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      attachmentName: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      attachmentMimeType: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      attachmentSize: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "messages",
    },
  );

  Message.associate = (models) => {
    Message.belongsTo(models.Conversation, {
      foreignKey: "conversationId",
      as: "conversation",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Message.belongsTo(models.User, {
      foreignKey: "senderId",
      as: "sender",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Message;
};
