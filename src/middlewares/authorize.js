const jwt = require("jsonwebtoken");

const roleTokenAuth = (req, res, next) => {
  const token = req.header("x-access-token");
  const jwtOptions = {
    issuer: process.env.ISSUER,
  };
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    jwtOptions,
    (err, decodePayloadToken) => {
      if (err) return res.status(403).json({ err });
      const { id, name } = decodePayloadToken;
      req.userInfo = { id, name };
      next();
    }
  );
};

const authOwner = (req, res, next) => {
  const token = req.header("x-access-token");
  const jwtOptions = {
    // issuer: process.env.ISSUER,
  };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err) {
      return res.status(403).json({ errMsg: "You need to login first.", err });
    }
    const { role } = payload;
    if (role !== 1)
      return res.status(403).json({ errMsg: "You need to login as an owner." });
    req.userInfo = payload;
    next();
  });
};

const authCustomer = (req, res, next) => {
  const token = req.header("x-access-token");
  const jwtOptions = {
    // issuer: process.env.ISSUER,
  };
  jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, payload) => {
    if (err)
      return res.status(403).json({ errMsg: "You need to login first.", err });
    const { role } = payload;
    if (role !== 2)
      return res
        .status(403)
        .json({ errMsg: "You need to login as a customer.", err });
    req.userInfo = payload;
    next();
  });
};

module.exports = { roleTokenAuth, authOwner, authCustomer };
