const express = require("express");
const router = express.Router();
const { OK, CREATED, SuccessResponse } = require("../core/success.response");
const AuthService = require("../services/auth.service");

class AuthController {
    //signup
    signup = async (req, res, next) => {
        new SuccessResponse({
            message: "OK!",
            metadata: await AuthService.signup(req.body),
        }).send(res);
    };

    //final signup
    finalSignup = async (req, res, next) => {
        new CREATED({
            message: "Signup successfully!",
            metadata: await AuthService.finalSignup(
                req.body,
                req.headers["user-agent"],
                req.ip
            ),
        }).send(res);
    };

    //signin
    signin = async (req, res, next) => {
        new SuccessResponse({
            message: "Signin successfully!",
            metadata: await AuthService.signin(
                req.body,
                req.headers["user-agent"],
                req.ip
            ),
        }).send(res);
    };

    signout = async (req, res, next) => {
        new SuccessResponse({
            message: "Signin successfully!",
            metadata: await AuthService.signout(req.session),
        }).send(res);
    };

    forgotPassword = async (req, res, next) => {
        new SuccessResponse({
            message: "Send mail successfully!",
            metadata: await AuthService.forgotPassword(req.body),
        }).send(res);
    };

    resetPassword = async (req, res, next) => {
        new SuccessResponse({
            message: "Reset password successfully!",
            metadata: await AuthService.resetPassword(req.body),
        }).send(res);
    };
}

module.exports = new AuthController();
