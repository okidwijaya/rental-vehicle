const mySql = require('mysql');

const dbConn = mySql.createConnection({
    host: process.env.HOST,
    user: process.env.UNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

module.exports = dbConn;