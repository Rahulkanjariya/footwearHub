"use strict";

const wishListModel = require("../models/wishlist");

/**
 * This function is use for create wishList
 *
 * @param {object} detail -The wishlist detail
 * @returns
 */
async function addToWishlist(detail) {
    const data = new wishListModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for delete user wishList by id
 * 
 * @param {string} id -The id of the user
 * @returns
 */
async function removeWishlist(id) {
    const data = await wishListModel.findByIdAndDelete(id).exec();
    return data;
}

/**
 * This function is use for list wishList
 *
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function listWishlist(skip, limit) {
    const list = await wishListModel
        .find()
        .populate("userId", "firstName -_id")
        .populate("productId", "name -_id")
        .skip(skip)
        .limit(limit);
    const total = await wishListModel.countDocuments().exec();
    return { list, total };
}

module.exports = {
    addToWishlist,
    removeWishlist,
    listWishlist
}