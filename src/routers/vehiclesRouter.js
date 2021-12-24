const express = require('express');

const useController = require('../controllers/vehiclesController');
const authorize = require('../middlewares/authorize');

const vehicleRouter = express.Router();

vehicleRouter.get('/', useController.getVehicles);

vehicleRouter.get('/search', useController.getVehiclesName);

vehicleRouter.post('/', authorize.roleTokenAuth, useController.postNewVehicles);

vehicleRouter.get('/byOrder', useController.getOrder);

vehicleRouter.get('/:id', useController.getVehicleById);

vehicleRouter.put('/', useController.updateVehicle);

vehicleRouter.delete('/:id', useController.deleteVehicle);

module.exports = vehicleRouter;