import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import lodash from "lodash";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";
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

export default app;
