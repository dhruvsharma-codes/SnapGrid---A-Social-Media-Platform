"use strict";

module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define(
    "GroupMember",
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

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("admin", "member"),
        allowNull: false,
        defaultValue: "member",
      },
    },
    {
      tableName: "groupmembers",
    }
  );

  GroupMember.associate = (models) => {
    GroupMember.belongsTo(models.Group, {
      foreignKey: "groupId",
      as: "group",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    GroupMember.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GroupMember;
};