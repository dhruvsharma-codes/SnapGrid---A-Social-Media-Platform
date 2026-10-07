"use strict";

const { Op } = require("sequelize");

const {
  Group,
  GroupMember,
  User,
  GroupMessage,
} = require("../models");

/*
  Create a new group
*/
const createGroup = async (
  currentUserId,
  name,
  memberIds = []
) => {
  if (!name || !name.trim()) {
    const error = new Error("Group name is required");
    error.statusCode = 400;
    throw error;
  }

  const cleanName = name.trim();

  if (cleanName.length > 100) {
    const error = new Error(
      "Group name cannot exceed 100 characters"
    );
    error.statusCode = 400;
    throw error;
  }

  currentUserId = Number(currentUserId);

  /*
    Remove duplicate IDs and convert them to numbers.
  */
  const uniqueMemberIds = [
    ...new Set(
      memberIds
        .map(Number)
        .filter((id) => Number.isInteger(id) && id > 0)
    ),
  ];

  /*
    Creator should automatically be a member.
  */
  const allMemberIds = [
    ...new Set([
      currentUserId,
      ...uniqueMemberIds,
    ]),
  ];

  /*
    Check that all users actually exist.
  */
  const users = await User.findAll({
    where: {
      id: {
        [Op.in]: allMemberIds,
      },
    },
    attributes: ["id", "username", "fullName", "profileImage"],
  });

  if (users.length !== allMemberIds.length) {
    const error = new Error(
      "One or more selected users do not exist"
    );
    error.statusCode = 400;
    throw error;
  }

  /*
    Create group.
  */
  const group = await Group.create({
    name: cleanName,
    createdBy: currentUserId,
    groupImage: "",
  });

  /*
    Add creator as admin.
  */
  const members = allMemberIds.map((userId) => ({
    groupId: group.id,
    userId,
    role:
      Number(userId) === currentUserId
        ? "admin"
        : "member",
  }));

  await GroupMember.bulkCreate(members);

  return await getGroupDetails(
    group.id,
    currentUserId
  );
};


/*
  Get one group with members.
*/
const getGroupDetails = async (
  groupId,
  currentUserId
) => {
  const group = await Group.findByPk(groupId, {
    include: [
      {
        model: User,
        as: "creator",
        attributes: [
          "id",
          "username",
          "fullName",
          "profileImage",
        ],
      },
      {
        model: GroupMember,
        as: "members",
        include: [
          {
            model: User,
            as: "user",
            attributes: [
              "id",
              "username",
              "fullName",
              "profileImage",
            ],
          },
        ],
      },
    ],
  });

  if (!group) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  /*
    Check whether current user is a member.
  */
  const isMember = group.members.some(
    (member) =>
      Number(member.userId) ===
      Number(currentUserId)
  );

  if (!isMember) {
    const error = new Error(
      "You are not a member of this group"
    );
    error.statusCode = 403;
    throw error;
  }

  return group;
};


/*
  Get all groups of logged-in user.
*/
const getMyGroups = async (currentUserId) => {
  const memberships =
    await GroupMember.findAll({
      where: {
        userId: currentUserId,
      },
      include: [
        {
          model: Group,
          as: "group",
          include: [
            {
              model: User,
              as: "creator",
              attributes: [
                "id",
                "username",
                "fullName",
                "profileImage",
              ],
            },
          ],
        },
      ],
      order: [
        [
          { model: Group, as: "group" },
          "updatedAt",
          "DESC",
        ],
      ],
    });

  const groups = [];

  for (const membership of memberships) {
    const group = membership.group;

    const lastMessage =
      await GroupMessage.findOne({
        where: {
          groupId: group.id,
        },
        include: [
          {
            model: User,
            as: "sender",
            attributes: [
              "id",
              "username",
              "fullName",
              "profileImage",
            ],
          },
        ],
        order: [
          ["createdAt", "DESC"],
          ["id", "DESC"],
        ],
      });

    const memberCount =
      await GroupMember.count({
        where: {
          groupId: group.id,
        },
      });

    groups.push({
      id: group.id,
      name: group.name,
      groupImage: group.groupImage,
      createdBy: group.createdBy,
      creator: group.creator,
      memberCount,
      lastMessage,
      role: membership.role,
      updatedAt: group.updatedAt,
    });
  }

  /*
    Latest activity first.
  */
  groups.sort((a, b) => {
    const aTime = new Date(
      a.lastMessage?.createdAt ||
        a.updatedAt
    ).getTime();

    const bTime = new Date(
      b.lastMessage?.createdAt ||
        b.updatedAt
    ).getTime();

    return bTime - aTime;
  });

  return groups;
};


/*
  Add users to an existing group.
  Only admin can add members.
*/
const addMembers = async (
  groupId,
  currentUserId,
  userIds
) => {
  const group =
    await getGroupDetails(
      groupId,
      currentUserId
    );

  const currentAdmin =
    group.members.find(
      (member) =>
        Number(member.userId) ===
        Number(currentUserId)
    );

  if (
    !currentAdmin ||
    currentAdmin.role !== "admin"
  ) {
    const error = new Error(
      "Only group admin can add members"
    );
    error.statusCode = 403;
    throw error;
  }

  const cleanUserIds = [
    ...new Set(
      userIds
        .map(Number)
        .filter(
          (id) =>
            Number.isInteger(id) && id > 0
        )
    ),
  ];

  if (!cleanUserIds.length) {
    const error = new Error(
      "At least one user is required"
    );
    error.statusCode = 400;
    throw error;
  }

  const users = await User.findAll({
    where: {
      id: {
        [Op.in]: cleanUserIds,
      },
    },
    attributes: ["id"],
  });

  if (users.length !== cleanUserIds.length) {
    const error = new Error(
      "One or more users do not exist"
    );
    error.statusCode = 400;
    throw error;
  }

  const existingMembers =
    await GroupMember.findAll({
      where: {
        groupId,
        userId: {
          [Op.in]: cleanUserIds,
        },
      },
      attributes: ["userId"],
    });

  const existingIds = new Set(
    existingMembers.map(
      (member) => Number(member.userId)
    )
  );

  const newMembers = cleanUserIds
    .filter(
      (userId) => !existingIds.has(userId)
    )
    .map((userId) => ({
      groupId,
      userId,
      role: "member",
    }));

  if (newMembers.length) {
    await GroupMember.bulkCreate(
      newMembers
    );
  }

  return await getGroupDetails(
    groupId,
    currentUserId
  );
};

const removeMember = async (
  groupId,
  currentUserId,
  userIdToRemove
) => {
  const group = await getGroupDetails(
    groupId,
    currentUserId
  );

  const currentAdmin = group.members.find(
    (member) =>
      Number(member.userId) ===
      Number(currentUserId)
  );

  if (
    !currentAdmin ||
    currentAdmin.role !== "admin"
  ) {
    const error = new Error(
      "Only group admin can remove members"
    );

    error.statusCode = 403;
    throw error;
  }

  userIdToRemove = Number(userIdToRemove);

  if (
    userIdToRemove === Number(currentUserId)
  ) {
    const error = new Error(
      "Admin cannot remove themselves"
    );

    error.statusCode = 400;
    throw error;
  }

  const member = await GroupMember.findOne({
    where: {
      groupId,
      userId: userIdToRemove,
    },
  });

  if (!member) {
    const error = new Error(
      "User is not a member of this group"
    );

    error.statusCode = 404;
    throw error;
  }

  if (member.role === "admin") {
    const error = new Error(
      "Admin cannot be removed"
    );

    error.statusCode = 400;
    throw error;
  }

  await member.destroy();

  return await getGroupDetails(
    groupId,
    currentUserId
  );
};


module.exports = {
  createGroup,
  getGroupDetails,
  getMyGroups,
  addMembers,
  removeMember
};