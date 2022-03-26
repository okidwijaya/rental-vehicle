const express = require("express");

const useController = require("../controllers/paymentHistoryController");
const authorize = require("../middlewares/authorize");

const historyRouter = express.Router();

// historyRouter.get('/', useController.getAllPaymentHistory)

historyRouter.get("/desc", useController.getPaymentHistory); //Rating

historyRouter.get("/", authorize.roleTokenAuth, useController.getHistoryById);

historyRouter.get("/search", useController.getHistoryuser);

historyRouter.post("/", useController.postNewHistory);

historyRouter.delete("/:id", useController.deleteHistory);

historyRouter.patch("/", useController.updatePaymentHistory);

module.exports = historyRouter;

// getHistoryById, deleteHistory
