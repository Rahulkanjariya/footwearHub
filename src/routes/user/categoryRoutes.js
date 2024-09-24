"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../controllers/user/categoryController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

/**
 * This route list all category
 */
router.get(
    "/list/category",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listCategory
);

/**
 * This route retrieve the detail of a specific category
 */
router.get(
    "/category/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_CATEGORY_ID),
    controller.categoryDetail
);

module.exports = router;