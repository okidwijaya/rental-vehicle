const historyModel = require('../models/paymentHistoryModel');
const responseHelper = require('../helpers/sendResponse');

const getPaymentHistory = (req, res) => {
    const { body } = req;
    historyModel
        .getPaymentHistory(body)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const postNewHistory = (req, res) => {
    const { body } = req;
    historyModel
        .postNewHistory(body)
        .then(({ status, result }) => {
            res.status(status).json({
                msg: 'Success',
                result: {
                    ...body,
                    id: result.insertId,
                },
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: 'terjadi error', err });
        });
};

const getHistoryById = (req, res) => {
    const { params } = req;
    const historyId = params.id;
    historyModel
        .getHistoryById(historyId)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const deleteHistory = (req, res) => {
    const { params } = req;
    const historyId = params.id;
    historyModel
        .deleteHistory(historyId)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const getHistoryuser = (req, res) => {
    const { query } = req;
    let keyword = "%%";
    if (query.user) keyword = `%${query.user}%`;
    historyModel
        .getHistoryuser(keyword)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const updatePaymentHistory = (req, res) => {
    const { body } = req;
    const id = body.id;
    historyModel
        .updatePaymentHistory(id, body)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

module.exports = { getPaymentHistory, postNewHistory, getHistoryById, deleteHistory, getHistoryuser, updatePaymentHistory };