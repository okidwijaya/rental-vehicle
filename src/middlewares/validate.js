const responseHelper = require("../helpers/sendResponse");

const register = (req, res, next) => {
  const { body } = req;
  const regBody = ["name", "email", "password"];
  const bodyProperty = Object.keys(body);
  const isReqBody = regBody.filter(
    (property) => !bodyProperty.includes(property)
  );
  if (isReqBody.length !== 0)
    return responseHelper.error(res, 400, "Invalid Body");

  next();
};

const login = (req, res, next) => {
  const { body } = req;
  const loginBody = ["email", "password"];
  const bodyProperty = Object.keys(body);
  const isBodyValid =
    loginBody.filter((property) => !bodyProperty.includes(property)).length == 0
      ? true
      : false;

  if (!isBodyValid) return responseHelper.error(res, 400, "Invalid Body");
  next();
};

module.exports = { register, login };
