const model = require("../models");
const {
    findUserByEmail,
    create,
    findUserByUsername,
    deleteUserByEmail,
    findUserByVerifyCode,
} = require("../models/repositories/user.repo");
const {
    BadRequestError,
    AuthFailureError,
    Unauthorized,
} = require("../core/error.response");
const bcrypt = require("bcrypt");
const makeVerification = require("uniqid");
const { confirmSignup } = require("../utils/mail.html");
const sendMail = require("../helpers/sendMaill");
const { createTokensPair } = require("../auth/authUtil");
const { createSession } = require("../models/repositories/session.repo");

class AuthService {
    /**
     *
     * @param {data} data
     * @returns data hashed
     */
    static hashData = async (data) => {
        return await bcrypt.hash(data, 10);
    };

    /**
     *
     * @param {input, data} data
     * @returns data compared
     */
    static validateData = async (input, data) => {
        return await bcrypt.compare(input, data);
    };

    /**
     *
     * User signup for new users
     * 1. Check user exist ?
     * 2. Password hashed
     * 3. Change email
     * 4. Create user temp with email changed
     * 5. Send confirm code to email
     *
     * @param {username, email, passwordm firstName, lastName} data
     * @returns message
     */
    static signup = async ({
        username,
        email,
        password,
        firstName,
        lastName,
    }) => {
        //Check user exist ?
        const emailExist = await findUserByEmail(email);
        if (emailExist) throw new BadRequestError("Email has been used!");

        const usernameExist = await findUserByUsername(username);
        if (usernameExist) throw new BadRequestError("Username has been used!");
        //password hash
        const passwordHash = await this.hashData(password);

        // email hash
        const verificationCode = makeVerification();
        const emailEdited = btoa(email) + "@" + verificationCode;

        const newUser = await create({
            username,
            email: emailEdited,
            password: passwordHash,
            firstName,
            lastName,
        });

        //config html confirm signup code
        const html = confirmSignup(verificationCode);

        if (newUser) {
            const data = {
                email,
                html,
                subject: "Signup with Email!",
            };

            // send signup code to email
            await sendMail(data);
        }

        //delete user after 5 minutes if not confirmed
        setTimeout(async () => {
            await deleteUserByEmail(emailEdited);
        }, 5 * 60 * 1000);

        return {
            code: "200",
            metadata: {
                user: newUser,
            },
        };
    };

    /**
     *
     * @param {{ String }} { verifyCode }
     * @param {String} clientAgent
     * @param {String} clientIp
     * @returns { user: {...}, tokens: { accessToken }}
     */
    static finalSignup = async ({ verifyCode }, clientAgent, clientIp) => {
        const user = await findUserByVerifyCode(verifyCode);
        if (!user)
            throw new AuthFailureError(
                "The data is invalid or you have timed out"
            );

        user.email = atob(user.email.split("@")[0]);
        user.save();

        const payload = {
            userId: user.id,
            roleId: user.roleId,
        };

        //create accessToken, refreshToken
        const tokens = await createTokensPair(
            payload,
            process.env.PUBLIC_KEY_JWT,
            process.env.PRIVATE_KEY_JWT
        );

        //create session user
        const session = await createSession({
            email: user.email,
            clientAgent: clientAgent,
            clientIp: clientIp,
            refreshToken: tokens.refreshToken,
            expiredAt: 604800,
        });

        if (!session) {
            throw new Unauthorized("Unable to create session");
        }

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            tokens: {
                accessToken: tokens.accessToken,
            },
        };
    };
}

module.exports = AuthService;
