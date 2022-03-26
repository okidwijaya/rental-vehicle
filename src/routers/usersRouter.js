const express = require("express");

const useController = require("../controllers/usersController");
const upload = require("../middlewares/upload");
const authorize = require("../middlewares/authorize");

const userRouter = express.Router();

userRouter.get("/", authorize.roleTokenAuth, useController.getUsers);

userRouter.patch(
  "/",
  authorize.roleTokenAuth,
  upload,
  useController.patchDataUsers
);

userRouter.get("/:id", useController.getUserById);

userRouter.delete("/:id", useController.deleteUser);

userRouter.get("/allusers", authorize.roleTokenAuth, useController.getAllUsers);

module.exports = userRouter;
