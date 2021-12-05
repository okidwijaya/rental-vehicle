const vehicleModel = require('../models/vehicle-model');

const getVehicles = (req, res) => {
    const { body } = req;
    vehicleModel
        .getVehicles(body)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "data kosong", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Terjadi Error", err });
        });
};

const postNewVehicles = (req, res) => {
    const { body } = req;
    vehicleModel
        .postNewVehicles(body)
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

module.exports = { getVehicles, postNewVehicles };