const express = require('express');

const useController = require('../controllers/users-controller');

const userRouter = express.Router();

userRouter.get('/', useController.getUsers);

userRouter.post('/', useController.postNewUser);

userRouter.get('/:id', useController.getUserById);

userRouter.delete('/:id', useController.deleteUser);

userRouter.put('/:id', useController.updateUser);

module.exports = userRouter;