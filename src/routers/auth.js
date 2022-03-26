const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/authController");

const validate = require("../middlewares/validate");

const authorize = require("../middlewares/authorize");

// auth/signIn
authRouter.post("/login", validate.login, authController.loginUser);

authRouter.post("/register", validate.register, authController.registerUser);

authRouter.delete("/logout", authorize.roleTokenAuth, authController.logout);

authRouter.post("/forgot", authController.forgotPassword);

authRouter.post("/cekotp", authController.checkOTP);

authRouter.post("/resetpassword", authController.resetPassword);

module.exports = authRouter;
