"use strict";

const brandModel = require("../models/brand");

/**
 * This function is use for get detail by filter
 * 
 * @param {object} filter -Filter
 * @returns 
 */
async function getDetail(filter) {
    const detail = await brandModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for list brand item
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function listBrand(query, skip, limit, sort) {
    const list = await brandModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await brandModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create new brand
 * 
 * @param {object} detail -The brand detail
 * @returns 
 */
async function addBrand(detail) {
    const data = new brandModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update brand by id
 * 
 * @param {string} id -The id of the brand
 * @param {object} detail -The updated brand detail
 * @returns 
 */
async function updateBrand(id, detail) {
    const data = await brandModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    )
    return data;
}

/**
 * This function is use for delete brand by id
 * 
 * @param {string} id -The id of the brand
 * @returns
 */
async function deleteBrand(id) {
    const data = await brandModel.findByIdAndDelete(id);
    return data;
}

module.exports = {
    getDetail,
    listBrand,
    addBrand,
    updateBrand,
    deleteBrand
}