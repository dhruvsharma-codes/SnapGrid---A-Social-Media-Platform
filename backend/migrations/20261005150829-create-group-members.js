"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GroupMembers", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Groups",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      role: {
        type: Sequelize.ENUM("admin", "member"),
        allowNull: false,
        defaultValue: "member",
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

    await queryInterface.addIndex(
      "GroupMembers",
      ["groupId", "userId"],
      {
        unique: true,
        name: "unique_group_member",
      }
    );

    await queryInterface.addIndex(
      "GroupMembers",
      ["userId"]
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("GroupMembers");
  },
};