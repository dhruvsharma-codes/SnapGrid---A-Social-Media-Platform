"use strict";

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userOneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      userTwoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Conversations",
    },
  );

  Conversation.associate = (models) => {
    Conversation.belongsTo(models.User, {
      foreignKey: "userOneId",
      as: "userOne",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Conversation.belongsTo(models.User, {
      foreignKey: "userTwoId",
      as: "userTwo",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Conversation.hasMany(models.Message, {
      foreignKey: "conversationId",
      as: "messages",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Conversation;
};
