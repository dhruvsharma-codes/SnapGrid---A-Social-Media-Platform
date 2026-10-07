"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Notifications", "followRequestId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "FollowRequests",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Notifications", "followRequestId");
  },
};
