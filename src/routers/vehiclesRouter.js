const express = require("express");
const multer = require("multer");

const useController = require("../controllers/vehiclesController");
const authorize = require("../middlewares/authorize");
// const upload = require("../middlewares/upload");
const upload = require("../middlewares/uploadMultiple");

const vehicleRouter = express.Router();

vehicleRouter.get("/", useController.getVehicles);

vehicleRouter.get("/all", useController.getVehiclesLimit);

vehicleRouter.get("/search", useController.getVehiclesName);

vehicleRouter.get("/byOrder", useController.getOrder);

vehicleRouter.get("/:id", useController.getVehicleById);

// vehicleRouter.post("/", authorize.roleTokenAuth, useController.postNewVehicles);

vehicleRouter.delete("/:id", useController.deleteVehicle);

vehicleRouter.patch("/", useController.updateVehicle);

// vehicleRouter.patch("/:id", authorize.checkToken, authorize.authOwner, useController.updateVehicleById);

vehicleRouter.post("/", authorize.roleTokenAuth, uploadMultiple, useController.postVehicle);

module.exports = vehicleRouter;
