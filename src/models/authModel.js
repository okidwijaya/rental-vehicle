const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbConn = require('../config/db');

const createNewUser = (body) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO users SET ?";
        bcrypt
            .hash(body.password, 10)
            .then((hashedPassword) => {
                const newBody = {
                    ...body,
                    password: hashedPassword,
                };
                dbConn.query(sqlQuery, [newBody], (err, result) => {
                    if (err) return reject({ status: 500, err });
                    resolve({ status: 201, result });
                });
            })
            .catch((err) => {
                reject({ status: 500, err });
            });
    });
};

const userLogIn = (body) => {
    return new Promise((resolve, reject) => {
        const { email_address, password } = body;
        const sqlQuery = `SELECT * FROM users WHERE ? AND ?`;
        dbConn.query(sqlQuery, [{ email_address }, { password }], (err, result) => {
            if (err) return reject({ status: 500, err });
            if (result.length == 0)
                return reject({ status: 401, err: "Wrong Email/Password" });
            const payload = {
                id: result[0].id,
                email_address: result[0].email_address,
            };
            const jwtOptions = {
                expiresIn: "5m",
                issuer: process.env.ISSUER,
            }
            jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
                if (err) return reject({ status: 500, err });
                resolve({
                    status: 200,
                    result: {
                        token,
                    },
                });
            });
        });
    });
};
module.exports = { createNewUser, userLogIn };