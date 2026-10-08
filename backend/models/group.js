"use strict";

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      groupImage: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      tableName: "groups",
    }
  );

  Group.associate = (models) => {
    Group.belongsTo(models.User, {
      foreignKey: "createdBy",
      as: "creator",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Group.hasMany(models.GroupMember, {
      foreignKey: "groupId",
      as: "members",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Group.hasMany(models.GroupMessage, {
      foreignKey: "groupId",
      as: "messages",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Group;
};