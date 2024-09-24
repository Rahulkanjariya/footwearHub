"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/userController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

/**
 * This route list all user
 */
router.get(
    "/list/user",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listUser
);

/**
 * This route retrieve the detail of a specific user
 */
router.get(
    "/user/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_USER_ID),
    controller.userDetail
);

/**
 * This route delete a specific user
 */
router.delete(
    "/delete/user/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_USER_ID),
    controller.deleteUser
);

module.exports = router;