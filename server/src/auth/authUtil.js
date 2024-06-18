const JWT = require("jsonwebtoken");

/**
 *
 * @param {Object} payload
 * @param {String} publicKey
 * @param {String} privateKey
 * @returns tokens {accessToken: string, refreshToken: string}: Object
 */
const createTokensPair = async (payload, publicKey, privateKey) => {
    try {
        // accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: "2 days",
        });

        //refreshtToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
        });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createTokensPair,
};
