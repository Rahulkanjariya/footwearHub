"use strict";

const userModel = require("../models/auth");

/**
 * This function is use for get detail by filter
 * 
 * @param {object} filter -Filter
 * @returns
 */
async function getDetail(filter) {
    const detail = await userModel.findOne(filter).exec();
    return detail;
}

/**
 * This function is use for list user
 *
 * @param {object} query -The query criteria
 * @param {number} skip -The number of record to skip
 * @param {number} limit -The number of record to limit
 * @returns
 */
async function listUser(query, skip, limit, sort) {
    query.isDeleted = false;
    const list = await userModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
    const total = await userModel.find(query).countDocuments().exec();
    return { list, total };
}

/**
 * This function is use for create user
 * 
 * @param {object} detail -The user detail
 * @returns 
 */
async function addUser(detail) {
    const data = new userModel(detail);
    const newData = await data.save();
    return newData;
}

/**
 * This function is use for update user
 * 
 * @param {string} id -The id of the user
 * @param {object} detail -The updated user detail
 * @returns 
 */
async function updateProfile(id, detail) {
    const data = await userModel.findByIdAndUpdate(
        id, 
        detail, 
        { new: true }
    )
    return data;
}

/**
 * This function is use for delete user by id
 * 
 * @param {string} id -The id of the user
 * @returns
 */
async function deleteUser(id) {
    const userInfo = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        mobileNumber: "",
        dateOfBirth: "",
        gender: "",
        isDeleted: true,
    };

    const user = await userModel.findOneAndUpdate(
        { _id: id, isDeleted: false },
        userInfo, 
        { new: true }
    ).exec();
    
    return user;
}

module.exports = {
    getDetail,
    listUser,
    addUser,
    updateProfile,
    deleteUser,
};