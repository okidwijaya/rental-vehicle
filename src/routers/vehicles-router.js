const express = require('express');

const useController = require('../controllers/vehicles-controller');

const vehicleRouter = express.Router();

vehicleRouter.get('/', useController.getVehicles);

vehicleRouter.post('/', useController.postNewVehicles);

module.exports = vehicleRouter;