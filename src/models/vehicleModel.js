const dbConn = require('../config/db');
const mysql = require('mysql');

const getVehicles = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM vehicles LIMIT 8'; //DESC
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const getVehiclesLimit = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM vehicles ORDER BY id ASC LIMIT 4'; //DESC
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};


const postNewVehicles = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO vehicles SET ?`;
        dbConn.query(sqlQuery, body, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({
                status: 201,
                result
            });
        });
    });
};

const getVehicleById = (vehicleId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `SELECT * FROM vehicles WHERE id = ${vehicleId}`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 200, result });
        });
    });
};

const deleteVehicle = (vehicleId) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `DELETE FROM vehicles WHERE id = ${vehicleId}`;
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({ status: 200, result });
        });
    });
};

const getVehiclesName = (keyword) => {
    return new Promise((resolve, reject) => {
        const selectQuery = `SELECT * FROM vehicles`;
        const searchQuery = ` WHERE name LIKE ?`;
        const sqlQuery = selectQuery + searchQuery;
        dbConn.query(sqlQuery, keyword, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const getOrder = (query) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = `SELECT v.name AS "Name", v.type AS "Type", v.city AS "City" FROM vehicles v`;
        const statement = [];
        const order = query.order;
        let orderBy = "";
        if (query.by && query.by.toLowerCase() == "name") orderBy = "v.name";
        if (query.by && query.by.toLowerCase() == "type") orderBy = "v.type";
        if (query.by && query.by.toLowerCase() == "City") orderBy = "v.city";
        if (order && orderBy) {
            sqlQuery += ` ORDER BY ? ?`;
            statement.push(mysql.raw(orderBy), mysql.raw(order));
        }

        const countQuery = `SELECT COUNT(*) AS "count" FROM users`;
        dbConn.query(countQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            const page = parseInt(query.page);
            const limit = parseInt(query.limit);
            const count = result[0].count;
            if (query.page && query.limit) {
                sqlQuery += " LIMIT ? OFFSET ?";
                const offset = (page - 1) * limit;
                statement.push(limit, offset);
            }

            const meta = {
                next: page == Math.ceil(count / limit) ? null : `/vehicles?by=id&order=asc&page=${page + 1}&limit=3`,
                prev: page == 1 ? null : `/vehicles?by=id&order=asc&page=${page - 1}&limit=3`,
                count,
            };

            dbConn.query(sqlQuery, statement, (err, result) => {
                if (err) return reject({ status: 500, err });
                resolve({ status: 200, result: { data: result, meta } });
            });
        });
    });
};


const updateVehicle = (id, body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `UPDATE vehicles SET ? WHERE id = ?`;
        dbConn.query(sqlQuery, [body, id], (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const postVehicle = (newBody) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO vehicles SET ?`;
        newBody = {
            ...newBody,
        }     
        dbConn.query(sqlQuery, newBody, (err, result) => {
            if (err) return reject({
                status: 500,
                err
            });
            resolve({
                status: 200,
                result
            });
        });
    });
};

module.exports = { getVehicles, postNewVehicles, getVehicleById, deleteVehicle, getVehiclesName, getOrder, updateVehicle,  getVehiclesLimit, postVehicle }; //, getVehiclesLimit