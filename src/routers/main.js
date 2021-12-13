const express = require('express');

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
});

mainRouter.get('/', (request, response) => {
    response.redirect('welcome');
});

// router file

module.exports = mainRouter;