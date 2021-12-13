require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./src/routers/main');
const cors = require('cors');

const server = express();
const logger = morgan(':method :url :status :res[content-length] - :response-time ms');

const port = 8000;
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

const corsOptions = {
    origin: "*",
    allowedHeaders: "x-access-token",
    method: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
};

server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(logger);
server.use(express.static('pictures'));
// server.options("/*", (req, res) => {
//   const corsHeader = {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Access-Control-Allow-Methods": ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//     "Access-Control-Allow-Headers": "x-access-token",
//   };
//   res.set(corsHeader);
//   res.status(204);
// });

server.use(mainRouter);