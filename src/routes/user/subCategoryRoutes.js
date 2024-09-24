"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/subCategoryController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

/**
 * This route list all subcategory
 */
router.get(
    "/list/subcategory",authenticateUser,
    query("search").optional().isString(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listSubCategory
);

/**
 * This route retrieve the detail of a specific subcategory
 */
router.get(
    "/subcategory/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SUB_CATEGORY_ID),
    controller.subCategoryDetail
);

module.exports = router;