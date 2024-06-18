const express = require("express");
const { asyncHandler } = require("../../helpers/asyncHandler");
const AuthController = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/signup", asyncHandler(AuthController.signup));
router.post("/final-signup", asyncHandler(AuthController.finalSignup));

module.exports = router;
