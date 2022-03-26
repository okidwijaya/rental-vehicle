const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbConn = require("../config/db");
const { sendForgotPass } = require("../helpers/sendForgot");

const registerUser = (body) => {
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
            return reject({
              status: 500,
              err: "Email address is already exist",
            });
          resolve({ status: 201, result });
        });
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const loginUser = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const sqlQuery = "SELECT * FROM users WHERE ?";

    dbConn.query(sqlQuery, [{ email }], async (err, result) => {
      if (err) return reject({ status: 500, err });
      // untuk cek apakah emailnya ada di db
      if (result.length == 0)
        return reject({
          status: 401,
          err: "Invalid Email/Password",
        });

      try {
        const hashedPassword = result[0].password;
        const checkPassword = await bcrypt.compare(password, hashedPassword);
        if (checkPassword) {
          const payload = {
            id: result[0].id,
            role: result[0].role,
          };
          const jwtOptions = {
            expiresIn: "1h",
            issuer: process.env.ISSUER,
          };
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            jwtOptions,
            (err, token) => {
              if (err) return reject({ status: 500, err });
              const data = {
                token,
                role: payload.role,
                id: payload.id,
              };
              resolve({ status: 200, result: data });
            }
          );
        } else {
          reject({ status: 401, err: "Invalid Email/Password" });
        }
      } catch (err) {
        reject({ status: 500, err });
      }
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
    const sqlQuery = `SELECT * FROM users WHERE email = ?`;

    dbConn.query(sqlQuery, [email], (err, result) => {
      if (err) return reject({ status: 500, err });
      if (result.length == 0)
        return reject({ status: 401, err: "Email is invalid" });
      // console.log("result", result[0].phone);
      const name = result[0].display_name;
      const otp = Math.ceil(Math.random() * 1000000);
      // console.log("OTP ", otp);
      sendForgotPass(email, { name: name, otp, email: email });
      const sqlQuery = `UPDATE users SET otp = ? WHERE email = ?`;

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
    const sqlQuery = `SELECT email, otp FROM users WHERE email = ? AND otp = ?`;

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
    const sqlQuery = `SELECT * FROM users WHERE email = ? AND otp = ?`;

    dbConn.query(sqlQuery, [email, otp], (err) => {
      if (err) return reject({ status: 500, err });

      const sqlUpdatePass = `UPDATE users SET password = ? WHERE email = ? AND otp =?`;
      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          dbConn.query(sqlUpdatePass, [hashedPassword, email, otp], (err) => {
            if (err) return reject({ status: 500, err });

            const sqlUpdateOTP = `UPDATE users SET otp = null WHERE email = ?`;
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
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  checkOTP,
  resetPassword,
};
