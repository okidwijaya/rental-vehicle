const express = require("express");
const dbConn = require("../config/db");

const mainRouter = express.Router();

const welcomeRouter = require("./welcome");
const getUsers = require("./usersRouter");
const getVehicles = require("./vehiclesRouter");
const getPaymentHistory = require("./paymentHistoryRouter");
const authRouter = require("./auth");

const upload = require("../middlewares/upload");

mainRouter.use("/welcome", welcomeRouter);
mainRouter.use("/users", getUsers);
mainRouter.use("/vehicles", getVehicles);
mainRouter.use("/history", getPaymentHistory);
mainRouter.use("/auth", authRouter);

mainRouter.patch("/upload", upload.single("name"), (req, res) => {
    const sqlQuery = "UPDATE image (name) VALUES (?) WHERE id = 8"; //UPDATE users SET ? WHERE id = ?
    dbConn.query(sqlQuery, [req.file.path], (err, result) => {
        //[req.file.destination]
        // if (err) return reject({ status: 500, err });
        return res.status(200).json({ msg: 'Upload successful', url: req.file });
  });
});

mainRouter.get("/", (request, response) => {
  response.redirect("welcome");
});
module.exports = mainRouter;
