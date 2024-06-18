const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const lodash = require("lodash");
const compression = require("compression");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./databases/init.mysql");
dotenv.config();

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//cors
app.use(
    cors({
        origin: process.env.URL_CLIENT,
        credentials: true,
    })
);

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//init database
db();
//init router

// handle errors
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal server error!",
    });
});

module.exports = app;
