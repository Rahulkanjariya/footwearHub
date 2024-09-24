"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/reviewController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

/**
 * This route list all review
 */
router.get(
    "/list/review",authenticateAdmin,
    query("search").optional().toInt(),
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listReview
);

/**
 * This route retrieve the detail of a specific review
 */
router.get(
    "/review/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_REVIEW_ID),
    controller.reviewDetail
);

module.exports = router;
