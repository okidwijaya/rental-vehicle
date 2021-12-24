const express = require('express');

const useController = require('../controllers/usersController');

const userRouter = express.Router();

userRouter.get('/', useController.getUsers);

userRouter.post('/', useController.postNewUser);

userRouter.get('/:id', useController.getUserById);

userRouter.delete('/:id', useController.deleteUser);

userRouter.put('/', useController.updatedPutUser);

userRouter.patch('/:id', useController.userUpdate);

module.exports = userRouter;