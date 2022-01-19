const dbConn = require('../config/db');

const getAllPaymentHistory = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM payment_history`;
        //const sqlQuery = `SELECT * FROM payment_history ORDER BY id DESC`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

//popoiular by rate
const getPaymentHistory = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT p.rating, p.location, p.destination, p.vehicle_name AS "name" FROM payment_history p GROUP BY p.vehicle_name ORDER BY COUNT(rating) DESC LIMIT 4`;
        //const sqlQuery = `SELECT * FROM payment_history ORDER BY id DESC`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const postNewHistory = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO payment_history SET ?`;
        dbConn.query(sqlQuery, body, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({
                status: 201,
                result
            });
        });
    });
};

const getHistoryById = (historyId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM payment_history WHERE id= ${historyId}`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 200, result });
        });
    });
};

const deleteHistory = (historyId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM payment_history WHERE id = ${historyId}`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 200, result });
        });
    });
};

const getHistoryuser = (keyword) => {
    return new Promise((resolve, reject) => {
        const selectQuery = `SELECT * FROM payment_history`;
        const searchQuery = ` WHERE user LIKE ?`;
        const sqlQuery = selectQuery + searchQuery;
        dbConn.query(sqlQuery, keyword, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const updatePaymentHistory = (id, body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE payment_history SET ? WHERE id = ?`;
        dbConn.query(sqlQuery, [body, id], (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

module.exports = {getAllPaymentHistory, getPaymentHistory, postNewHistory, getHistoryById, deleteHistory, getHistoryuser, updatePaymentHistory };