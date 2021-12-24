const responseHelper = require('../helpers/sendResponse');

const register = (req, res, next) => {
    const { body } = req;
    const regBody = ["name", "email_address", "password"];
    const bodyProperty = Object.keys(body);
    const isReqBody = regBody.filter(
        (property) => !bodyProperty.includes(property)
    )
    if (isReqBody.length !== 0) return responseHelper.error(res, 400, "Invalid Body");

    next();

};

module.exports = { register };