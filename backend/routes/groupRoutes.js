"use strict";

const express = require("express");

const router = express.Router();

const groupController =
  require("../controllers/groupController.js");

const groupMessageController =
  require("../controllers/groupMessageController.js");

const authMiddleware =
  require("../middlewares/authMiddleware.js");


/*
  Create Group
  POST /api/groups
*/
router.post(
  "/",
  authMiddleware,
  groupController.createGroup
);


/*
  Get My Groups
  GET /api/groups
*/
router.get(
  "/",
  authMiddleware,
  groupController.getMyGroups
);


/*
  Group Messages
  IMPORTANT:
  Put this before /:groupId
*/
router.get(
  "/:groupId/messages",
  authMiddleware,
  groupMessageController.getGroupMessages
);

router.post(
  "/:groupId/messages",
  authMiddleware,
  groupMessageController.createGroupMessage
);


/*
  Get Group Details
  GET /api/groups/:groupId
*/
router.get(
  "/:groupId",
  authMiddleware,
  groupController.getGroupDetails
);


/*
  Add Members
  POST /api/groups/:groupId/members
*/
router.post(
  "/:groupId/members",
  authMiddleware,
  groupController.addMembers
);

router.delete(
  "/:groupId/members/:userId",
  authMiddleware,
  groupController.removeMember
);


module.exports = router;