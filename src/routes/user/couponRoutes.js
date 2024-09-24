"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/couponController");
const Msg = require("../../utils/messages");
const { param,query } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

/**
 * This route list all coupon
 */
router.get(
    "/list/coupon",authenticateUser,
    query("page").optional().toInt(),
    query("perPage").optional().toInt(),
    controller.listCoupon
);

/**
 * This route retrieve the detail of a specific coupon
 */
router.get(
    "/coupon/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_COUPON_ID),
    controller.couponDetail
);

module.exports = router;