const historyModel = require('../models/payment-history-model');
const responseHelper = require('../helpers/sendResponse');

const getPaymentHistory = (req, res) => {
    const { body } = req;
    historyModel
        .getPaymentHistory(body)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "payment kosong", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
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
        .catch((status, err) => {
            res.status(status).json({ msg: 'terjadi error', err });
        });
};

const getHistoryById = (req, res) => {
    historyModel.getHistoryById(req.params.id, (err, result) => {
        if (err)
            res.send(err);
        res.json(result);
    });
};

const deleteHistory = (req, res) => {
    historyModel.deleteHistory(req.params.id, (err, History) => {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'successfully deleted' });
    });
};


module.exports = { getPaymentHistory, postNewHistory, getHistoryById, deleteHistory };