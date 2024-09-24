"use strict";

const subCategoryModel = require("../models/subCategory");

/**
 * This function is use for get detail by filter
 *
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const detail = await subCategoryModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for list sub category
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function listSubCategory(query, skip, limit, sort) {
    query.isActive = true;
    const list = await subCategoryModel
        .find(query)
        .populate("categoryId", "name -_id")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    
    const total = await subCategoryModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create sub category
 * 
 * @param {object} detail -The sub category detail
 * @returns 
 */
async function addSubCategory(detail) {
    const data = new subCategoryModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update sub category by id
 * 
 * @param {string} id -The id of the sub category
 * @param {object} detail -The updated sub category detail
 * @returns 
 */
async function updateSubCategory(id, detail) {
    const data = await subCategoryModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    );
    return data;
}

/**
 * This function is use for soft delete sub category by id
 * 
 *  @param {string} id -The id of the sub category
 *  @returns
 */
async function deleteSubCategory(id) {
    const subCategoryInfo = {
        name: "",
        isActive: false
    };

    const subCategory = await subCategoryModel.findOneAndUpdate(
        { _id: id, isActive: true },
        subCategoryInfo,
        { new: true }
    ).exec();

    return subCategory;
}


module.exports = {
    getDetail,
    listSubCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
};