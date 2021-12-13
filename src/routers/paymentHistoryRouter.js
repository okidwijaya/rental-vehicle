const express = require('express');

const useController = require('../controllers/paymentHistoryController');

const historyRouter = express.Router();

historyRouter.get('/', useController.getPaymentHistory); //Rating

historyRouter.get('/search', useController.getHistoryuser);

historyRouter.post('/', useController.postNewHistory);

historyRouter.get('/:id', useController.getHistoryById);

historyRouter.delete('/:id', useController.deleteHistory);

module.exports = historyRouter;

// getHistoryById, deleteHistory