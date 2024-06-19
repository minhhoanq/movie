const model = require("../models");
const {
    findUserByEmail,
    create,
    findUserByUsername,
    deleteUserByEmail,
    findUserByVerifyCode,
    findUserById,
    findOneUser,
    updateUser,
} = require("../models/repositories/user.repo");
const {
    BadRequestError,
    AuthFailureError,
    Unauthorized,
    NotFoundError,
} = require("../core/error.response");
const bcrypt = require("bcrypt");
const makeVerification = require("uniqid");
const { confirmSignup, resetPasswordMail } = require("../utils/mail.html");
const sendMail = require("../helpers/sendMaill");
const { createTokensPair, decodeJWT } = require("../auth/authUtil");
const {
    createSession,
    findOneSession,
    updateSession,
    deleteSession,
} = require("../models/repositories/session.repo");
const crypto = require("crypto");

class AuthService {
    /**
     *
     * @param {data} data
     * @returns data hashed
     */
    static hashData = async (data) => {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(data, salt);
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
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

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

    /**
     *
     * @param {*} param0
     * @param {*} clientAgent
     * @param {*} clientIp
     * @returns
     */
    static signin = async ({ email, password }, clientAgent, clientIp) => {
        const user = await findUserByEmail(email);
        if (!user) throw new Unauthorized("Email is not correct!");

        console.log(password + " | " + user.password);
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) throw new Unauthorized("Invalid password");

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

        const sessionExist = await findOneSession(
            user.email,
            clientAgent,
            clientIp
        );

        let session;
        if (sessionExist) {
            //update session user
            session = await updateSession({
                email: sessionExist.email,
                clientAgent: sessionExist.clientAgent,
                clientIp: sessionExist.clientIp,
                refreshToken: tokens.refreshToken,
                expiredAt: 604800,
            });
        } else {
            //create session user
            session = await createSession({
                email: user.email,
                clientAgent: clientAgent,
                clientIp: clientIp,
                refreshToken: tokens.refreshToken,
                expiredAt: 604800,
            });
        }

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

    /**
     *
     * @param {*} session
     * @returns
     */
    static signout = async (session) => {
        const deleteSessionUser = await deleteSession(session.id);
        if (!deleteSessionUser)
            throw new BadRequestError("Error signout! Pls try again");

        return true;
    };

    static refreshTokenUser = async (
        user,
        refreshToken,
        session,
        clientAgent,
        clientIp
    ) => {
        const { userId } = user;
        if (session.refreshToken !== refreshToken)
            throw new Unauthorized("Invalid refresh token!");

        const userExist = await findUserById(userId);
        if (!userExist) throw new NotFoundError("User not found!");

        const payload = {
            userId: userExist.id,
            roleId: userExist.roleId,
        };

        //create accessToken, refreshToken
        const tokens = await createTokensPair(
            payload,
            process.env.PUBLIC_KEY_JWT,
            process.env.PRIVATE_KEY_JWT
        );

        const sessionExist = await findOneSession(
            user.email,
            clientAgent,
            clientIp
        );

        if (!sessionExist) throw new NotFoundError("Session not found");

        await updateSession({
            email: sessionExist.email,
            clientAgent: sessionExist.clientAgent,
            clientIp: sessionExist.clientIp,
            refreshToken: tokens.refreshToken,
            expiredAt: 604800,
        });

        return {
            user: {
                id: userExist.id,
                email: userExist.email,
                firstName: userExist.firstName,
                lastName: userExist.lastName,
            },
            tokens: {
                accessToken: tokens.accessToken,
            },
        };
    };

    static getMe = async (accessToken) => {
        const { userId } = await decodeJWT(accessToken);
        const user = await findUserById(userId);
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    };

    static forgotPassword = async ({ email }) => {
        if (!email) throw new AuthFailureError("Missing email!");
        const user = await findUserByEmail(email);
        if (!user) throw new NotFoundError("User not found!");

        const resetTokenPassword = user.createPasswordChangedToken();
        console.log(resetTokenPassword);

        await user.save();

        const html = resetPasswordMail(resetTokenPassword);
        const data = {
            email: user.email,
            html,
            subject: "Forgot password!",
        };

        await sendMail(data);

        return true;
    };

    static resetPassword = async ({ newPassword, tokenPassword }) => {
        if (!newPassword || !tokenPassword)
            throw new BadRequestError("Missing data!");

        const passwordResetToken = crypto
            .createHash("sha256")
            .update(tokenPassword)
            .digest("hex");

        const dateNow = Date.now();

        const user = await findOneUser({
            passwordResetToken: passwordResetToken,
            passwordResetExpires: dateNow.toString(),
        });

        if (!user)
            throw new AuthFailureError(
                "The data is invalid or you have timed out"
            );

        const hashedPassword = await this.hashData(newPassword);

        user.password = hashedPassword;
        user.passwordResetToken = "";
        user.passwordChangedAt = dateNow.toString();
        user.passwordResetExpires = "";
        user.save();

        return user;
    };
}

module.exports = AuthService;
