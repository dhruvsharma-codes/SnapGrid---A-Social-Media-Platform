"use strict";

const groupService = require("../services/groupService");

const createGroup = async (req, res, next) => {
  try {
    const {
      name,
      memberIds = [],
    } = req.body;

    const group =
      await groupService.createGroup(
        req.user.id,
        name,
        memberIds
      );

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: {
        group,
      },
    });
  } catch (error) {
    next(error);
  }
};


const getMyGroups = async (
  req,
  res,
  next
) => {
  try {
    const groups =
      await groupService.getMyGroups(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: {
        groups,
      },
    });
  } catch (error) {
    next(error);
  }
};


const getGroupDetails = async (
  req,
  res,
  next
) => {
  try {
    const group =
      await groupService.getGroupDetails(
        req.params.groupId,
        req.user.id
      );

    return res.status(200).json({
      success: true,
      data: {
        group,
      },
    });
  } catch (error) {
    next(error);
  }
};


const addMembers = async (
  req,
  res,
  next
) => {
  try {
    const {
      userIds = [],
    } = req.body;

    const group =
      await groupService.addMembers(
        req.params.groupId,
        req.user.id,
        userIds
      );

    return res.status(200).json({
      success: true,
      message: "Members added successfully",
      data: {
        group,
      },
    });
  } catch (error) {
    next(error);
  }
};


const removeMember = async (
  req,
  res,
  next
) => {
  try {
    const group =
      await groupService.removeMember(
        req.params.groupId,
        req.user.id,
        req.params.userId
      );

    return res.status(200).json({
      success: true,
      message: "Member removed successfully",
      data: {
        group,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGroup,
  getMyGroups,
  getGroupDetails,
  addMembers,
  removeMember
};