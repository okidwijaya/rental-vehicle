const express = require('express');

const useController = require('../controllers/usersController');
const upload = require('../middlewares/upload');
const authorize = require('../middlewares/authorize')

const userRouter = express.Router();

userRouter.get('/', authorize.roleTokenAuth , useController.getUsers);

userRouter.post('/', useController.postNewUser);

userRouter.get('/:id', useController.getUserById);

userRouter.delete('/:id', useController.deleteUser);

userRouter.patch('/',upload.single('picture'), useController.updatedUser);

userRouter.patch('/picture',upload.single('propicture'), useController.updatedUserPicture);

module.exports = userRouter;