"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Conversations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      userOneId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "Users",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      userTwoId: {
        type: Sequelize.INTEGER,
        allowNull: false,

        references: {
          model: "Users",
          key: "id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

    await queryInterface.addIndex("Conversations", ["userOneId", "userTwoId"], {
      unique: true,
      name: "unique_conversation_users",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Conversations");
  },
};
