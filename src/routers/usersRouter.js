const express = require('express');

const useController = require('../controllers/usersController');
const upload = require('../middlewares/upload');

const userRouter = express.Router();

userRouter.get('/', useController.getUsers);

userRouter.post('/', useController.postNewUser);

userRouter.get('/:id', useController.getUserById);

userRouter.delete('/:id', useController.deleteUser);

userRouter.put('/', useController.updatedPutUser);

userRouter.patch('/userPatch', upload.single('image_path'), useController.patchUser);

module.exports = userRouter;


//userRouter.patch('/:id', useController.userUpdate);