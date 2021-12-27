const userModel = require('../models/userModel');
const responseHelper = require('../helpers/sendResponse');

const getUsers = (req, res) => {
    const { body } = req;
    userModel
        .getUsers(body)
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

const updatedPutUser = (req, res) => {
    const { body } = req;
    const id = body.id;
    userModel
        .updatedPutUser(id, body)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const userUpdate = (req, res) => {
    const { id } = req.params;
    const { nama } = req;
    userModel
        .userUpdate(id, nama)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const patchUser = (req, res) => {
    const { body } = req;
    const id = body.id;
    userModel
        .patchUser(body, id)
        .then(({ status, result }) => {
            res.status(status).json({
                msg: 'Success',
                result: {
                    ...body,
                    url: req.file,
                    id: result.insertId,
                },
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: 'terjadi error', err });
        });
};


module.exports = { getUsers, postNewUser, deleteUser, getUserById, userUpdate, updatedPutUser, patchUser }; //, patchUser