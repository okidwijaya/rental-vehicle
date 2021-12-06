const express = require('express');

const mainRouter = express.Router();

const welcomeRouter = require('./welcome');
const getUsers = require('./users-router');
const getVehicles = require('./vehicles-router');
const getPaymentHistory = require('./payment-history-router');

mainRouter.use('/welcome', welcomeRouter);
mainRouter.use('/users', getUsers);
mainRouter.use('/vehicles', getVehicles);
mainRouter.use('/history', getPaymentHistory);

mainRouter.get('/', (request, response) => {
    response.redirect('welcome');
});

// router file

module.exports = mainRouter;