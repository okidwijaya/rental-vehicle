const dbConn = require('../config/db');

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM users`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const postNewUser = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO users SET?`;
        dbConn.query(sqlQuery, body, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({
                status: 201,
                result
            });
        });
    });
};

const getUserById = (id, result) => {
    dbConn.query(`SELECT * FROM users WHERE id =?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

const deleteUser = (id, result) => {
    dbConn.query(`DELETE FROM users WHERE id = ?`, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

const updateUser = (id, result) => {
    dbConn.query(`UPDATE users SET = ? WHERE id = ?`, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = { getUsers, postNewUser, deleteUser, getUserById, updateUser };
// const getUserById = (byId) => {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = `SELECT * FROM users WHERE id = ${byId}`;
//         db.query(sqlQuery, (err, result) => {
//             if (err) return reject({ status: 500, err });
//             // if (result.length == 0) return resolve({ status: 404, result }); 
//             resolve({ status: 200, result });
//         });
//     });
// };
// const deleteUser = (userId) => {
//     return new Promise((resolve, reject) => {
//         const sqlQuery = `DELETE FROM users WHERE id = ?${userId}`;
//         db.query(sqlQuery, (err, result) => {
//             if (err) return reject({ status: 500, err });
//             // console.log(result.length);
//             if (result.length == 0) return resolve({ status: 404, result });
//             resolve({ status: 200, result });
//         });
//     });
// };