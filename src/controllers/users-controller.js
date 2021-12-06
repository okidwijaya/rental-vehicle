const userModel = require('../models/user-model');
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
        .catch((status, err) => {
            res.status(status).json({ msg: 'terjadi error', err });
        });
};

const getUserById = (req, res) => {
    userModel.getUserById(req.params.id, (err, result) => {
        if (err)
            res.send(err);
        res.json(result);
    });
};

const deleteUser = (req, res) => {
    userModel.deleteUser(req.params.id, (err, user) => {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'successfully deleted' });
    });
};

const updateUser = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'required field' });
    } else {
        userModel.updateUser(req.params.id, new Users(req.body), (err, result) => {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'Users successfully updated' });
        });
    }
};

module.exports = { getUsers, postNewUser, deleteUser, getUserById, updateUser };
// const getUserById = (req, res) => {
//     const { params } = req;
//     const byId = params.id;
//     userModel
//         .getUserById(byId)
//         .then(({ status, result }) => {
//             if (status == 404)
//                 return res
//                     .status(status)
//                     .json({ msg: "userroritemukan", result });
//             res.status(status).json({ result });
//         })
//         .catch(({ status, err }) => {
//             res.status(status).json({ msg: "Terjadi Error", err });
//         });
// };


// const deleteUser = (req, res) => {
//     const { params } = req;
//     const userId = params.id;
//     // const {
//     //     body: { id },
//     // } = req;
//     userModel
//         .deleteUser(userId)
//         .then(({ status, result }) => {
//             if (status == 404)
//                 console.log(res.status(status).json({ msg: "test error", result }));
//             res.status(status).json({ result });
//         })
//         .catch(({ status, err }) => {
//             res.status(status).json({ msg: "Terjadi Error", err });
//         });
// };