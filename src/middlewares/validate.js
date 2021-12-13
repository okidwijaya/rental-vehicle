const responseHelper = require('../helpers/sendResponse');

const register = (req, res, next) => {
    const { body } = req;
    const registerBody = ["name", "email_address", "password"];
    const bodyProperty = Object.keys(body);
    const isBodyValid = registerBody.filter(
            (property) => !bodyProperty.includes(property)
        ).length == 0 ?
        true :
        false; //harus beda

    console.log(isBodyValid); //diganti bad req

    if (!isBodyValid) return responseHelper.error(res, 400, "Invalid Body");
    next();
    //body
    //tmbh validate email tdk boellhs sama
    //va;idate body di middel ware
};

module.exports = { register };