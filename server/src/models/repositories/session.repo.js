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

module.exports = {
    createSession,
};
