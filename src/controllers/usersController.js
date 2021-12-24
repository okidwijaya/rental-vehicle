const userModel = require('../models/userModel');
const responseHelper = require('../helpers/sendResponse');

const getUsers = (req, res) => {
    const { body } = req;
    userModel
        .getUsers(body)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "user kosong", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
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
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "Kelas Tidak Ditemukan", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

const deleteUser = (req, res) => {
    const { params } = req;
    const userId = params.id;
    userModel
        .deleteUser(userId)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "Kelas Tidak Ditemukan", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

const updatedPutUser = (req, res) => {
    const { body } = req;
    const id = body.id;
    userModel
        .updatedPutUser(id, body)
        .then(({ status, result }) => {
            res.status(status).json({
                msg: 'Success',
                result: {
                    result,
                },
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

const userUpdate = (req, res) => {
    const { id } = req.params;
    const { nama } = req;
    userModel
        .userUpdate(id, nama)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "error", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

// .getUserByName(name.toLocaleLowerCase())


// const patchUser = (req, res) => {
//     const { body } = req;
//     const userId = body.id;
//     userModel
//         .patchUser(userId, body)
//         .then(({ status, result }) => {
//             if (status == 404)
//                 return res
//                     .status(status)
//                     .json({ msg: "User tidak ditemukan", result: [] });
//             res.status(status).json({
//                 msg: "Data updated successfully",
//                 result: {
//                     ...body,
//                     id: result.insertId,
//                 },
//             });
//         })
//         .catch(({ status, err }) => {
//             res.status(status).json({ msg: "Terjadi Error", err });
//         });
// };

module.exports = { getUsers, postNewUser, deleteUser, getUserById, userUpdate, updatedPutUser }; //, patchUser