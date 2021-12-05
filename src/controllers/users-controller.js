const userModel = require('../models/user-model');
// const responseHelper = require('../helpers/sendResponse');

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
        .catch((status, err) => {
            res.status(status).json({ msg: 'terjadi error', err });
        });
};

const deleteUser = (req, res) => {
    const { params } = req;
    const userId = params.id;
    userModel
        .deleteUser(userId)
        .then(({ status, result }) => {
            if (status == 404)
                return res.status(status).json({ msg: "User id Tidak Ditemukan", result });
            res.status(status).json({ result });
            console.log(data.affectedRows + " record(s) updated");
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};


module.exports = { getUsers, postNewUser, deleteUser };