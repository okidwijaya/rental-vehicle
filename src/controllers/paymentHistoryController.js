const historyModel = require('../models/paymentHistoryModel');
// const responseHelper = require('../helpers/sendResponse');

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
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "Kelas Tidak Ditemukan", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

const deleteHistory = (req, res) => {
    const { params } = req;
    const historyId = params.id;
    historyModel
        .deleteHistory(historyId)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "Kelas Tidak Ditemukan", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

const getHistoryuser = (req, res) => {
    const { query } = req;
    let keyword = "%%";
    if (query.user) keyword = `%${query.user}%`;
    historyModel
        .getHistoryuser(keyword)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "Kelas Tidak Ditemukan", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

const updatePaymentHistory = (req, res) => {
    const { body } = req;
    const id = body.id;
    historyModel
        .updatePaymentHistory(id, body)
        .then(({ status, result }) => {
            res.status(status).json({
                msg: 'Success',
                result: {
                    result,
                },
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

module.exports = { getPaymentHistory, postNewHistory, getHistoryById, deleteHistory, getHistoryuser, updatePaymentHistory };