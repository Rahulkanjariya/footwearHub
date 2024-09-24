"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../controllers/user/brandController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

/**
 * This route is for listing all brand
 */
router.get(
    "/list/brand",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listBrand
);

/**
 * This route retrieve the detail of a specific brand
 */
router.get(
    "/brand/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_BRAND_ID),
    controller.brandDetail
);

module.exports = router;