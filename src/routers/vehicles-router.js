const express = require('express');

const useController = require('../controllers/vehicles-controller');

const vehicleRouter = express.Router();

vehicleRouter.get('/', useController.getVehicles);

vehicleRouter.post('/', useController.postNewVehicles);

vehicleRouter.get('/:id', useController.getVehicleById);

vehicleRouter.delete('/:id', useController.deleteVehicle);

module.exports = vehicleRouter;