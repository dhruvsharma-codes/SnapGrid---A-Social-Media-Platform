"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "Conversations",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "Users",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex("Messages", ["conversationId", "createdAt"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Messages");
  },
};
