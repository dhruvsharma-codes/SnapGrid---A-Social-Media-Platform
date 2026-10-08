"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
//       authProvider: {
//   type: DataTypes.ENUM(
//     "local",
//     "google"
//   ),
//   allowNull: false,
//   defaultValue: "local",
// },

// googleId: {
//   type: DataTypes.STRING,
//   allowNull: true,
//   unique: true,
// },
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING(150),
        allowNull: true,
        defaultValue: "",
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      followersCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      followingCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      postsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: "users",
    },
  );
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Like, {
      foreignKey: "userId",
      as: "likes",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Follow, {
      foreignKey: "followerId",
      as: "following",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Follow, {
      foreignKey: "followingId",
      as: "followers",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.FollowRequest, {
      foreignKey: "senderId",
      as: "sentFollowRequests",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.FollowRequest, {
      foreignKey: "receiverId",
      as: "receivedFollowRequests",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });


    User.hasMany(models.Notification, {
      foreignKey: "senderId",
      as: "sentNotifications",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Notification, {
      foreignKey: "receiverId",
      as: "receivedNotifications",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    User.hasMany(models.Conversation, {
      foreignKey: "userOneId",
      as: "conversationsAsUserOne",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Conversation, {
      foreignKey: "userTwoId",
      as: "conversationsAsUserTwo",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Message, {
      foreignKey: "senderId",
      as: "sentMessages",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    User.hasMany(models.Group, {
  foreignKey: "createdBy",
  as: "createdGroups",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(models.GroupMember, {
  foreignKey: "userId",
  as: "groupMemberships",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(models.GroupMessage, {
  foreignKey: "senderId",
  as: "groupMessages",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(models.SavedPost, {
  foreignKey: "userId",
  as: "savedPosts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
  };
  return User;
};
