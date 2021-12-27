const express = require('express');
const multer = require('multer');

const useController = require('../controllers/vehiclesController');
const authorize = require('../middlewares/authorize');
const upload = require('../middlewares/upload');

const vehicleRouter = express.Router();

vehicleRouter.get('/', useController.getVehicles);

vehicleRouter.get('/search', useController.getVehiclesName);

vehicleRouter.post('/', authorize.roleTokenAuth, useController.postNewVehicles);

vehicleRouter.get('/byOrder', useController.getOrder);

vehicleRouter.get('/:id', useController.getVehicleById);

vehicleRouter.put('/', useController.updateVehicle);

vehicleRouter.delete('/:id', useController.deleteVehicle);

vehicleRouter.put('/uploadImage', upload.single('image_path'), useController.postVehicleImage);

module.exports = vehicleRouter;