"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/addressController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

/**
 * This route is for listing all address for a user
 */
router.get(
    "/list/address",authenticateAdmin,
    query("search").optional().isString(),
    query("page").optional().isInt(),
    query("perPage").optional().isInt(),
    controller.listAddress
);

/**
 * This route is for retrieving a specific user address detail
 */
router.get(
    "/address/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_ADDRESS_ID),
    controller.addressDetail
);

module.exports = router;