"use strict";

const couponModel = require("../models/coupon");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns 
 */
async function getDetail(filter) {
    const detail = await couponModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for list coupon
 *
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function listCoupon(skip, limit) {
    const list = await couponModel
        .find()
        .skip(skip)
        .limit(limit);
    const total = await couponModel.find().countDocuments();
    return { list, total };
}

/**
 * This function is use for create coupon
 * 
 * @param {object} detail -The coupon detail
 * @returns 
 */
async function addCoupon(detail) {
    const data = new couponModel(detail);
    const newData = await data.save();
    return newData;
}
/**
 * Increments the usedCount of a coupon
 * 
 * @param {string} id - The ID of the coupon
 * @returns 
 */
async function updateCouponUsage(id) {
    const updatedCoupon = await couponModel.findByIdAndUpdate(
        id,
        { $inc: { usedCount: 1 } },
        { new: true, runValidators: true }
    );
    return updatedCoupon;
}

/**
 * This function is use for delete coupon by id
 * 
 * @param {string} id - The id of the coupon
 * @returns 
 */
async function deleteCoupon(id) {
    const data = await couponModel.findByIdAndDelete(id);
    return data;
}

module.exports = {
    getDetail,
    listCoupon,
    addCoupon,
    updateCouponUsage,
    deleteCoupon
};
