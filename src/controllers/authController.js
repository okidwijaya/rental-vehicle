const authModel = require("../models/authModel");
const responseHelper = require("../helpers/sendResponse");

const newUserRegisters = (req, res) => {
  const { body } = req;
  authModel
    .createNewUser(body)
    .then(({ status, result }) => {
      const objResponse = {
        id: result.insertId,
        email: body.email_address,
        name: body.name,
      };
      responseHelper.success(res, status, objResponse);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const signInUser = (req, res) => {
  const { body } = req;
  authModel
    .userLogIn(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, result);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const logout = (req, res) => {
  const token = req.header("x-access-token");
  //   console.log('token', token)
  authModel
    .logoutUser(token)
    .then(({ status }) => {
      return responseHelper.success(res, status, {
        msg: "Logout Success",
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const forgotPassword = (req, res) => {
  const { body } = req;

  authModel
    .forgotPassword(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "OTP sent successfully",
        data: result,
      });
    })
    .catch(({ status, err }) => {
      console.log(err);
      responseHelper.error(res, status, err);
    });
};

const checkOTP = (req, res) => {
  const { body } = req;

  authModel
    .checkOTP(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "OTP is valid",
        data: result,
      });
    })
    .catch(({ status, err }) => {
      console.log(err);
      responseHelper.error(res, status, err);
    });
};

const resetPassword = (req, res) => {
  const { body } = req;

  authModel
    .resetPassword(body)
    .then(({ status }) => {
      responseHelper.success(res, status, {
        msg: "Password updated successfully",
        data: body.email,
      });
    })
    .catch(({ status, err }) => {
      console.log(err);
      responseHelper.error(res, status, err);
    });
};

module.exports = {
  newUserRegisters,
  signInUser,
  logout,
  resetPassword,
  checkOTP,
  forgotPassword,
};
