const vehicleModel = require('../models/vehicleModel');
const responseHelper = require('../helpers/sendResponse');

const getVehicles = (req, res) => {
    const { body } = req;
    vehicleModel
        .getVehicles(body)
        .then(({ status, result }) => {
            if (status == 404)
                return res
                    .status(status)
                    .json({ msg: "data not found", result });
            res.status(status).json({ result });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: "Error", err });
        });
};

const postNewVehicles = (req, res) => {
    const { body, userInfo } = req;
    console.log("[DEBUG] userInfo", userInfo);

    vehicleModel
        .postNewVehicles(body, userInfo) //userinfo
        .then(({ status, result }) => {
            res.status(status).json({
                msg: 'Success',
                result: {
                    userInfo,
                    ...body,
                    id: result.insertId,
                },
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({ msg: 'error', err });
        });
};

const getVehicleById = (req, res) => {
    const { params } = req;
    const vehicleId = params.id;
    vehicleModel
        .getVehicleById(vehicleId)
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

const deleteVehicle = (req, res) => {
    const { params } = req;
    const vehicleId = params.id;
    vehicleModel
        .deleteVehicle(vehicleId)
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

const getVehiclesName = (req, res) => {
    const { query } = req;
    let keyword = "%%";
    if (query.name) keyword = `%${query.name}%`;
    vehicleModel
        .getVehiclesName(keyword)
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

const getOrder = (req, res) => {
    const { query } = req;
    vehicleModel
        .getOrder(query)
        .then(({ status, result }) => {
            responseHelper.success(res, status, result);
        })
        .catch(({ status, err }) => {
            responseHelper.error(res, status, err);
        });
};

const updateVehicle = (req, res) => {
    const { body } = req;
    const id = body.id;
    vehicleModel
        .updateVehicle(id, body)
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



module.exports = { getVehicles, postNewVehicles, getVehicleById, deleteVehicle, getVehiclesName, getOrder, updateVehicle };