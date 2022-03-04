const userModel = require('../models/userModel');
const responseHelper = require('../helpers/sendResponse');

const getUsers = (req, res) => {
    const { id } = req.userInfo;
    console.log("[DEBUG] userInfo", id);
    userModel
      .getUsers(id)
      .then(({ status, result }) => {
        responseHelper.success(res, status, result);
      })
      .catch(({ status, err }) => {
        responseHelper.error(res, status, err);
      });
  };

const getAllUsers = (req, res) => {
    const { body } = req;
    userModel
        .getAllUsers(body)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const postNewUser = (req, res) => {
    const { body } = req;
    userModel
        .postNewUser(body)
        .then(({ status, result }) => {
            res.status(status).json({
                msg: 'Success',
                result: {
                    ...body,
                    id: result.insertId,
                },
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: 'terjadi error', err });
        });
};

const getUserById = (req, res) => {
    const { params } = req;
    const userId = params.id;
    userModel
        .getUserById(userId)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const deleteUser = (req, res) => {
    const { params } = req;
    const userId = params.id;
    userModel
        .deleteUser(userId)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const updatedUser = (req, res) => {
    const { body } = req;
    const id = body.id;
    userModel
        .updatedUser(id, body)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const updatedUserPicture = (req, res) => {
    const { path } = req;
    userModel
        .updatedUserPicture( path)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

module.exports = { getUsers, getAllUsers, postNewUser, deleteUser, getUserById, updatedUser, updatedUserPicture }; //, patchUser