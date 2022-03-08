const express = require("express");
const multer = require("multer");

const useController = require("../controllers/vehiclesController");
const authorize = require("../middlewares/authorize");
// const upload = require("../middlewares/upload");
const uploadVehicle = require("../middlewares/uploadVehicle");

const vehicleRouter = express.Router();

vehicleRouter.get("/", useController.getVehicles);

vehicleRouter.get("/all", useController.getVehiclesLimit);

vehicleRouter.get("/search", useController.getVehiclesName);

vehicleRouter.get("/byOrder", useController.getOrder);

vehicleRouter.get("/:id", useController.getVehicleById);

vehicleRouter.delete("/:id", useController.deleteVehicle);

vehicleRouter.patch("/", useController.updateVehicle);

vehicleRouter.post(
  "/",
  authorize.roleTokenAuth,
  uploadVehicle.multiUpload,
  useController.insertDataVehicles
);

module.exports = vehicleRouter;
