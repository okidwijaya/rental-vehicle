const jwt = require('jsonwebtoken');

const roleTokenAuth = (req, res, next) => {
    const token = req.header('x-access-token');
    const jwtOptions = {
        issuer: process.env.ISSUER,
    };
    jwt.verify(token, process.env.SECRET_KEY, jwtOptions, (err, decodePayloadToken) => {
        if (err) return res.status(403).json({ err });
        const { id, name } = decodePayloadToken;
        req.userInfo = { id, name };
        next();
    });
};

module.exports = { roleTokenAuth };