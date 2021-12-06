const dbConn = require('../config/db');

const getVehicles = () => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * FROM vehicles';
        dbConn.query(sqlQuery, (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0) return resolve({ status: 404, result });
            resolve({ status: 200, result });
        });
    });
};

const postNewVehicles = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = `INSERT INTO vehicles SET?`;
        dbConn.query(sqlQuery, body, (err, result) => {
            if (err) return reject({ status: 500, err });
            resolve({
                status: 201,
                result
            });
        });
    });
};

const getVehicleById = (id, result) => {
    dbConn.query(`SELECT * FROM Vehicles WHERE id =?`, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
}

const deleteVehicle = (id, result) => {
    dbConn.query("DELETE FROM Vehicles WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = { getVehicles, postNewVehicles, getVehicleById, deleteVehicle };