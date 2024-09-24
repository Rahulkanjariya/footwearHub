"use strict";

const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/shipmentController");
const Msg = require("../../utils/messages");
const { body,param,query } = require("express-validator");
const { authenticateAdmin } = require("../../middleware/authToken");

/**
 * This route add a new shipment
 */
router.post(
    "/add/shipment",authenticateAdmin,
    body("orderId")
        .notEmpty()
        .withMessage(Msg.ORDER_ID_REQUIRED)
        .isMongoId()
        .withMessage(Msg.INVALID_ORDER_ID),
    body("status")
        .notEmpty()
        .withMessage(Msg.STATUS_REQUIRED),
    body("trackingNumber")
        .notEmpty()
        .withMessage(Msg.TRACKING_NUMBER_REQUIRED),
    body("estimatedDelivery")
        .notEmpty()
        .withMessage(Msg.ESTIMATED_DELIVERY_REQUIRED)
        .isDate({ format: "DD-MM-YYYY", strictMode: true })
        .withMessage(Msg.INVALID_ESTIMATED_DATE),
    controller.addShipment
);

/**
 * This route update the status of a specific shipment
 */
router.put(
    "/update/shipment/status/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SHIPMENT_ID),
    controller.updateShipmentStatus
);

/**
 * This route retrieve the detail of a specific shipment
 */
router.get(
    "/shipment/detail/:id",authenticateAdmin,
    param("id")
        .isMongoId()
        .withMessage(Msg.INVALID_SHIPMENT_ID),
    controller.shipmentDetail
);

module.exports = router;
