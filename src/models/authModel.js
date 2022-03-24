const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConn = require("../config/db");
const { sendForgotPass } = require("../helpers/sendForgot");

const createNewUser = (body) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "INSERT INTO users SET ?";
    bcrypt
      .hash(body.password, 10)
      .then((hashedPassword) => {
        const newBody = {
          ...body,
          password: hashedPassword,
        };
        dbConn.query(sqlQuery, [newBody], (err, result) => {
          if (err)
            return reject({ status: 500, err: "Email is already exist" });
          resolve({ status: 201, result });
        });
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const userLogIn = (body) => {
  return new Promise((resolve, reject) => {
    const { email_address, password, name } = body;
    const sqlQuery = `SELECT * FROM users WHERE ?`; //AND ?
    dbConn.query(sqlQuery, { email_address }, (err, result) => {
      //, { password }]

      if (err) return reject({ status: 500, err });
      if (result.length == 0)
        return reject({ status: 401, err: "Wrong Email/Password" });

      bcrypt.compare(password, result[0].password, function (err) {
        if (err) return reject({ status: 500, err });
        const payload = {
          id: result[0].id,
          name: result[0].name,
          email_address: result[0].email_address,
          role: result[0].role,
          picture: result[0].picture,
        };
        const jwtOptions = {
          expiresIn: "10h",
          issuer: process.env.ISSUER,
        };
        jwt.sign(payload, process.env.SECRET_KEY, jwtOptions, (err, token) => {
          if (err) return reject({ status: 500, err });
          resolve({
            status: 200,
            result: {
              token,
              payload,
            },
          });
        });
      });
    });
  });
};

const logoutUser = (token) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "INSERT INTO blacklist_token (token) VALUES (?)";

    dbConn.query(sqlQuery, [token], (err, result) => {
      if (err) return reject({ status: 500, err });
      resolve({ status: 200, result });
    });
  });
};

const forgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const sqlQuery = `SELECT * FROM users WHERE email_address = ?`;

    dbConn.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0)
        return reject({ status: 401, err: "Email is invalid" });
      // console.log("result", result[0].phone);
      const name = result[0].display_name;
      const otp = Math.ceil(Math.random() * 1000000);
      // console.log("OTP ", otp);
      sendForgotPass(email, { name: name, otp });
      const sqlQuery = `UPDATE users SET otp = ? WHERE email_address = ?`;

      dbConn.query(sqlQuery, [otp, email], (err) => {
        if (err) return reject({ status: 500, err });
        const data = {
          email: email,
        };
        resolve({ status: 200, result: data });
      });
    });
  });
};

const checkOTP = (body) => {
  return new Promise((resolve, reject) => {
    const { email, otp } = body;
    const sqlQuery = `SELECT email_address, otp FROM users WHERE email_address = ? AND otp = ?`;

    dbConn.query(sqlQuery, [email, otp], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length === 0)
        return reject({ status: 401, err: "Invalid OTP" });
      const data = {
        email: email,
      };
      resolve({ status: 200, result: data });
    });
  });
};

const resetPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password, otp } = body;
    const sqlQuery = `SELECT * FROM users WHERE email_address = ? AND otp = ?`;

    dbConn.query(sqlQuery, [email, otp], (err) => {
      if (err) return reject({ status: 500, err });

      const sqlUpdatePass = `UPDATE users SET password = ? WHERE email_address = ? AND otp =?`;
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          dbConn.query(sqlUpdatePass, [hashedPassword, email, otp], (err) => {
            if (err) return reject({ status: 500, err });

            const sqlUpdateOTP = `UPDATE users SET otp = null WHERE email_address = ?`;
            dbConn.query(sqlUpdateOTP, [email], (err, result) => {
              if (err) return reject({ status: 500, err });
              resolve({ status: 201, result });
            });
          });
        })
        .catch((err) => {
          reject({ status: 500, err });
        });
    });
  });
};

module.exports = {
  createNewUser,
  userLogIn,
  logoutUser,
  forgotPassword,
  checkOTP,
  resetPassword,
};
