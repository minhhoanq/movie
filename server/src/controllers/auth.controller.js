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
}

module.exports = new AuthController();
