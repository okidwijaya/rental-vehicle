const vehicleModel = require("../models/vehicleModel");
const responseHelper = require("../helpers/sendResponse");

const getVehicles = (req, res) => {
  const { body } = req;
  vehicleModel
    .getVehicles(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getVehicleById = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;
  vehicleModel
    .getVehicleById(vehicleId)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const deleteVehicle = (req, res) => {
  const { params } = req;
  const vehicleId = params.id;
  vehicleModel
    .deleteVehicle(vehicleId)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getVehiclesName = (req, res) => {
  const { query } = req;
  let keyword = "%%";
  if (query.name) keyword = `%${query.name}%`;
  vehicleModel
    .getVehiclesName(keyword)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const getSortBy = (req, res) => {
  const { query } = req;
  // let keyword = "%%";
  // if (query.name) keyword = `%${query.name}%`;
  // const order = query.order;
  vehicleModel
    .getSortBy(query)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const updateVehicle = (req, res) => {
  // const { params } = req;
  // const id = params.id;
  // let { body } = req;
  const { body, params, files } = req;
  const vehicleId = params.id;
  const imgVehicle = files;
  let dataImg = [];
  let newBody;

  if (req.files) {
    for (let i = 0; i < imgVehicle.length; i++) {
      dataImg.push(imgVehicle[i].filename);
    }
    let photos = JSON.stringify(dataImg);
    newBody = {
      ...body,
      images: photos,
    };
  } else {
    newBody = { ...body, id: vehicleId };
  }
  vehicleModel
    .updateVehicle(newBody, vehicleId)
    .then(({ status }) => {
      if (status == 404)
        return responseHelper.success(res, status, {
          msg: "Vehicle id not found",
        });
      responseHelper.success(res, status, {
        msg: "Update Data Successfully",
        result: {
          ...newBody,
          vehicleId,
        },
      });
    })
    .catch(({ status, err }) => {
      console.log(err);
      responseHelper.error(res, status, err);
    });
};

const postVehicle = (req, res) => {
  const { body, files } = req;
  // const { id } = req.userInfo;
  console.log("body", body);
  console.log("files", files);

  const imgVehicle = files;
  let dataImages = [];
  let newBody;

  if (imgVehicle) {
    for (let i = 0; i < imgVehicle.length; i++) {
      dataImages.push(imgVehicle[i].filename);
    }
    let vehicleImages = JSON.stringify(dataImages);
    newBody = {
      ...body,
      images: vehicleImages,
    };
  }

  vehicleModel
    .postVehicle(newBody)
    .then(({ status, result }) => {
      res.status(status).json({
        msg: "Vehicle has been added",
        result: {
          ...newBody,
          id: result.insertId,
        },
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

module.exports = {
  getVehicles,
  getVehicleById,
  deleteVehicle,
  getVehiclesName,
  getSortBy,
  updateVehicle,
  postVehicle,
};
