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

mainRouter.post('/upload', upload.single('name'), (req, res) => {
    // res.status(200).json({ msg: 'Upload successful', url: req.file });
    const sqlQuery = "INSERT INTO vehicles (image_path) VALUES (?)";
    dbConn.query(sqlQuery, [req.file.path], (err, result) => { //[req.file.destination]
        if (err) throw err
        console.log('file uploaded successfully');
        // if (err) return reject({ status: 500, err });
        // resolve({
        //     status: 201,
        //     result
        // });
    });
});

mainRouter.get('/', (request, response) => {
    response.redirect('welcome');
});


// router file

module.exports = mainRouter;