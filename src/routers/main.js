const express = require('express');
const dbConn = require('../config/db');

const mainRouter = express.Router();

const welcomeRouter = require('./welcome');
const getUsers = require('./usersRouter');
const getVehicles = require('./vehiclesRouter');
const getPaymentHistory = require('./paymentHistoryRouter');
const authRouter = require('./auth');

const upload = require('../middlewares/upload');

mainRouter.use('/welcome', welcomeRouter);
mainRouter.use('/users', getUsers);
mainRouter.use('/vehicles', getVehicles);
mainRouter.use('/history', getPaymentHistory);
mainRouter.use('/auth', authRouter);

mainRouter.post('/upload', upload.single('profile'), (req, res) => {
    res.status(200).json({ msg: 'Upload successful', url: req.file });
    // dbConn.query(`UPDATE image SET image_path = ? WHERE id = 1`, (err, rows) => {
    //     if (!err) {
    //         res.redirect('/');
    //     } else {
    //         console.log(err);
    //     }
    // });

    // const sqlQuery = `UPDATE image SET image_path = ? WHERE id = 1`;
    // dbConn.query(sqlQuery, (err, result) => {
    //     if (err) return ({ status: 500, err });
    //     if (result.length == 0) return ({ status: 404, result });
    //     return ({ status: 200, result });
    // });
});

mainRouter.get('/', (request, response) => {
    response.redirect('welcome');
});


// router file

module.exports = mainRouter;