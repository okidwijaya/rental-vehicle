const express = require("express");
const multer = require("multer");

const useController = require("../controllers/vehiclesController");
const authorize = require("../middlewares/authorize");
const upload = require("../middlewares/upload");
const uploadVehicle = require("../middlewares/uploadVehicle");

const vehicleRouter = express.Router();

vehicleRouter.get("/all", useController.getVehicles);

vehicleRouter.get("/:id", useController.getVehicleById);

vehicleRouter.delete("/:id", useController.deleteVehicle);

vehicleRouter.get("/search", useController.getVehiclesName);

vehicleRouter.get("/", useController.getSortBy);

vehicleRouter.patch(
  "/:id",
  authorize.roleTokenAuth,
  uploadVehicle.multiUpload,
  useController.updateVehicle
);

vehicleRouter.post(
  "/",
  authorize.roleTokenAuth,
  authorize.authOwner,
  uploadVehicle.multiUpload,
  useController.postVehicle
);

module.exports = vehicleRouter;
