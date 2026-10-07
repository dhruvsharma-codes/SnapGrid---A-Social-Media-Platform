"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SavedPosts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint(
      "SavedPosts",
      {
        fields: ["userId", "postId"],
        type: "unique",
        name: "unique_user_saved_post",
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("SavedPosts");
  },
};