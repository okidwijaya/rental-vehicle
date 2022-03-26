const authModel = require("../models/authModel");
const responseHelper = require("../helpers/sendResponse");

const registerUser = (req, res) => {
  const { body } = req;
  authModel
    .registerUser(body)
    .then(({ status, result }) => {
      const objResponse = {
        id: result.insertId,
        email: body.email,
        name: body.name,
      };
      responseHelper.success(res, status, objResponse);
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};

const loginUser = (req, res) => {
  const { body } = req;
  authModel
    .loginUser(body)
    .then(({ status, result }) => {
      responseHelper.success(res, status, {
        msg: "Login Successful",
        data: result,
      });
    })
    .catch(({ status, err }) => {
      responseHelper.error(res, status, err);
    });
};
// const loginUser = (req, res) => {
//   const { body } = req;
//   authModel
//     .userLogIn(body)
//     .then(({ status, result }) => {
//       responseHelper.success(res, status, result);
//     })
//     .catch(({ status, err }) => {
//       responseHelper.error(res, status, err);
//     });
// };

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
  registerUser,
  loginUser,
  logout,
  resetPassword,
  checkOTP,
  forgotPassword,
};
