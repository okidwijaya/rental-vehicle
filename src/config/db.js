const mySql = require('mysql');

const dbConn = mySql.createConnection({
    host: process.env.HOST,
    user: process.env.UNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
});

dbConn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected..!');
    }
});

module.exports = dbConn;