const express = require('express');

const useController = require('../controllers/usersController');
const upload = require('../middlewares/upload');

const userRouter = express.Router();

userRouter.get('/', useController.getUsers);

userRouter.post('/', useController.postNewUser);

userRouter.get('/:id', useController.getUserById);

userRouter.delete('/:id', useController.deleteUser);

userRouter.patch('/',upload.single('picture'), useController.updatedUser);

userRouter.patch('/picture',upload.single('picture'), useController.updatedUserPicture);

module.exports = userRouter;