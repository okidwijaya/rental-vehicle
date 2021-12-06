const dbConn = require('../config/db');

const getPaymentHistory = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM payment_history`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const postNewHistory = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO payment_history SET?`;
        dbConn.query(sqlQuery, body, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({
                status: 201,
                result
            });
        });
    });
};

const getHistoryById = (id, result) => {
    dbConn.query(`SELECT * FROM payment_history WHERE id =?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

const deleteHistory = (id, result) => {
    dbConn.query("DELETE FROM payment_history WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = { getPaymentHistory, postNewHistory, getHistoryById, deleteHistory };