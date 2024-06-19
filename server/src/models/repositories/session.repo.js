const { where } = require("sequelize");
const model = require("../../models");

/**
 *
 * @param {Srting} email
 * @param {String} clientAgent
 * @param {String} clientIp
 * @param {String} refreshToken
 * @param {number} expiredAt
 * @returns sessions
 */
const createSession = async ({
    email,
    clientAgent,
    clientIp,
    refreshToken,
    expiredAt,
}) => {
    return await model.Session.create({
        email,
        clientAgent,
        clientIp,
        refreshToken,
        expiredAt,
    });
};

const findOneSession = async (email, clientAgent, clientIp) => {
    return await model.Session.findOne({
        email,
        clientAgent,
        clientIp,
    });
};

const updateSession = async ({
    email,
    clientAgent,
    clientIp,
    refreshToken,
    expiredAt,
}) => {
    return await model.Session.update(
        {
            refreshToken,
            expiredAt,
        },
        {
            where: {
                email,
                clientAgent,
                clientIp,
            },
        }
    );
};

const deleteSession = async (sessionId) => {
    return await model.Session.destroy({
        where: {
            id: sessionId,
        },
        force: true,
    });
};

module.exports = {
    createSession,
    findOneSession,
    updateSession,
    deleteSession,
};
