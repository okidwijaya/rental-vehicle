const express = require('express');

const useController = require('../controllers/users-controller');

const userRouter = express.Router();

userRouter.get('/', useController.getUsers);

userRouter.post('/', useController.postNewUser);

userRouter.delete('/:id', useController.deleteUser);

module.exports = userRouter;