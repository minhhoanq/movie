const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const AuthController = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/signup", asyncHandler(AuthController.signup));
router.post("/final-signup", asyncHandler(AuthController.finalSignup));

router.post("/signin", asyncHandler(AuthController.signin));
router.post("/signout", asyncHandler(AuthController.signout));
router.post("/forgot-password", asyncHandler(AuthController.forgotPassword));
router.post("/reset-password", asyncHandler(AuthController.resetPassword));

module.exports = router;
