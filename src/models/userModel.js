const req = require('express/lib/request');
const res = require('express/lib/response');
const dbConn = require('../config/db');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM users ORDER BY id DESC`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const postNewUser = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO users SET ?`;
        dbConn.query(sqlQuery, body, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({
                status: 201,
                result
            });
        });
    });
};

const getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM users WHERE id = ${userId}`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 200, result });
        });
    });
};

const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM users WHERE id = ${userId}`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 200, result });
        });
    });
};

// UPDATE rental_arka.users SET name = 'okdwijaya' WHERE id =1;
const updatedPutUser = (id, body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE users 
        SET ? 
        WHERE id = ?`;
        dbConn.query(sqlQuery, [body, id], (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};
module.exports = { getUsers, postNewUser, deleteUser, getUserById, updatedPutUser }; //, patchUser,  userUpdate

// const userUpdate = (name, id) => {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = `
//           UPDATE users SET name = "${name}"  WHERE id = ${id}`;
//         dbConn.query(sqlQuery, [name, id], (err, result) => {
//             if (err) return reject({ status: 500, err });
//             resolve({ status: 200, result });
//         });
//     });
// };

// const userUpdate = (id, body) => {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = ` UPDATE users SET ?  WHERE id = ${id}`;
//         dbConn.query(sqlQuery, [id, body], (err, result) => {
//             if (err) return reject({ status: 500, err });
//             resolve({ status: 200, result });
//         });
//     });
// };

// const updatedPutUser = () => {
//     return new Promise((resolve, reject) => {
//         const data = {...req.body };
//         const querySearch = `SELECT FROM users WHERE id = ?`;
//         const queryUpdate = `UPDATE users SET ? WHERE id = ?`;
//         dbConn.query(querySearch, req.params.id, (err, rows) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Something wrong', error: err });
//             }
//             if (rows.length) {
//                 dbConn.query(queryUpdate, [data, req.params.id], (err, result) => {
//                     if (err) return reject({ status: 500, err });
//                     resolve({ status: 200, result });
//                 });
//             } else {
//                 return res.status(404).json({ message: 'Data not found', error });
//             }
//         });
//     });
// }