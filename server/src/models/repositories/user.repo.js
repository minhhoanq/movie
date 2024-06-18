const { where, Op } = require("sequelize");
const model = require("../../models");

const findUserByEmail = async (email) => {
    return await model.User.findOne({
        where: {
            email: email,
        },
    });
};

const findUserByUsername = async (username) => {
    return await model.User.findOne({
        where: {
            username: username,
        },
    });
};

const findUserByVerifyCode = async (verifyCode) => {
    return await model.User.findOne({
        where: {
            email: {
                [Op.endsWith]: `${verifyCode}`,
            },
        },
    });
};

const deleteUserByEmail = async (email) => {
    return await model.User.destroy({
        where: {
            email: email,
        },
        force: true,
    });
};

const create = async ({ username, firstName, lastName, password, email }) => {
    return await model.User.create({
        username,
        firstName,
        lastName,
        password,
        email,
    });
};

module.exports = {
    findUserByEmail,
    findUserByUsername,
    findUserByVerifyCode,
    create,
    deleteUserByEmail,
};
