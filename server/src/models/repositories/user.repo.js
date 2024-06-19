const { where, Op } = require("sequelize");
const model = require("../../models");

const findUserByEmail = async (email) => {
    return await model.User.findOne({
        where: {
            email: email,
        },
    });
};

const findUserById = async (userId) => {
    return await model.User.findByPk(userId);
};

const findUserByUsername = async (username) => {
    return await model.User.findOne({
        where: {
            username: username,
        },
    });
};

const findOneUser = async ({ passwordResetToken, passwordResetExpires }) => {
    return await model.User.findOne({
        where: {
            passwordResetToken,
            passwordResetExpires: {
                [Op.gt]: passwordResetExpires,
            },
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

const updateUser = async ({
    userId,
    username,
    firstName,
    lastName,
    email,
    password,
    phone,
    avatar,
    dob,
    roleId,
    status,
    isVerify,
    passwordChangedAt,
    passwordResetToken,
    passwordResetExpires,
}) => {
    console.log(
        "chcek",
        password,
        passwordChangedAt,
        passwordResetToken,
        passwordResetExpires
    );

    return await model.User.update(
        {
            username,
            firstName,
            lastName,
            email,
            password,
            phone,
            avatar,
            dob,
            roleId,
            status,
            isVerify,
            passwordChangedAt,
            passwordResetToken,
            passwordResetExpires,
        },
        {
            where: { id: userId },
        }
    );
};

module.exports = {
    findUserByEmail,
    findUserById,
    findUserByUsername,
    findOneUser,
    findUserByVerifyCode,
    create,
    deleteUserByEmail,
    updateUser,
};
