"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../controllers/user/shipmentController");
const Msg = require("../../utils/messages");
const { param } = require("express-validator");
const { authenticateUser } = require("../../middleware/authToken");

/**
 * This route retrieve the detail of a specific shipment
 */
router.get(
    "/shipment/detail/:id",authenticateUser,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SHIPMENT_ID),
    controller.shipmentDetail
);

module.exports = router;