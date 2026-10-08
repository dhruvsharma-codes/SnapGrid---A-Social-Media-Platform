"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Messages",
      "messageType",
      {
        type: Sequelize.ENUM(
          "text",
          "image",
          "file"
        ),
        allowNull: false,
        defaultValue: "text",
      }
    );

    await queryInterface.addColumn(
      "Messages",
      "attachmentUrl",
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      "Messages",
      "attachmentName",
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      "Messages",
      "attachmentMimeType",
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      "Messages",
      "attachmentSize",
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "Messages",
      "messageType"
    );

    await queryInterface.removeColumn(
      "Messages",
      "attachmentUrl"
    );

    await queryInterface.removeColumn(
      "Messages",
      "attachmentName"
    );

    await queryInterface.removeColumn(
      "Messages",
      "attachmentMimeType"
    );

    await queryInterface.removeColumn(
      "Messages",
      "attachmentSize"
    );
  },
};