const express = require('express');

const useController = require('../controllers/payment-history-controller');

const historyRouter = express.Router();

historyRouter.get('/', useController.getPaymentHistory);

historyRouter.post('/', useController.postNewHistory);

historyRouter.get('/:id', useController.getHistoryById);

historyRouter.delete('/:id', useController.deleteHistory);

module.exports = historyRouter;

// getHistoryById, deleteHistory