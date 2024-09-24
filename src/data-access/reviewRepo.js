"use strict";

const reviewModel = require("../models/review");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const detail = await reviewModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for list review
 *
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function listReview(skip, limit) {
    const list = await reviewModel.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "userDetail"
            }
        },
        {
            $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productDetail"
            }
        },

        {
            $unwind: { 
                path: "$userDetail", 
                preserveNullAndEmptyArrays: true 
            }
        },
        {
            $unwind: { 
                path: "$productDetail", 
                preserveNullAndEmptyArrays: true 
            }
        },

        {
            $project: {
                _id: 1,
                rating: 1,
                comment: 1,
                "userDetail.firstName": 1,
                "userDetail.lastName": 1,
                "productDetail.name": 1,
            }
        },

        { $skip: skip },
        { $limit: limit }
        
    ]);

    const total = await reviewModel.countDocuments().exec();
    return { list, total };
}


/**
 * This function is use for create review
 *
 * @param {object} detail -The review detail
 * @returns
 */
async function addReview(detail) {
    const data = new reviewModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update review by id 
 * 
 * @param {string} id -The id of the review
 * @param {object} detail -The updated review detail
 * @returns 
 */
async function updateReview(id, detail) {
    const data = await reviewModel.findByIdAndUpdate(id, detail, { new: true }).exec();
    return data;
}

/**
 * This function is use for delete review by id
 * 
 * @param {string} id -The id of the review
 * @returns 
 */
async function deleteReview(id) {
    const data = await reviewModel.findByIdAndDelete(id).exec();
    return data;
}

module.exports = {
    getDetail,
    listReview,
    addReview,
    updateReview,
    deleteReview
};
