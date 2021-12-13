const express = require('express');

const authRouter = express.Router();

const authController = require('../controllers/authController');

const validate = require('../middlewares/validate');

// auth/signIn
authRouter.post('/signIn', authController.signInUser);

authRouter.post('/signUp', validate.register, authController.newUserRegisters);

authRouter.delete('/logOut');

module.exports = authRouter;