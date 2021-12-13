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

const userUpdate = (name, id) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `
          UPDATE users SET name = "${name}"  WHERE id = ${id}`;
        dbConn.query(sqlQuery, [name, id], (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 200, result });
        });
    });
};

// const userUpdate = (id, body) => {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = ` UPDATE users SET ?  WHERE id = ${id}`;
//         dbConn.query(sqlQuery, [id, body], (err, result) => {
//             if (err) return reject({ status: 500, err });
//             resolve({ status: 200, result });
//         });
//     });
// };

module.exports = { getUsers, postNewUser, deleteUser, getUserById, userUpdate }; //, patchUser