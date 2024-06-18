const { Sequelize } = require("sequelize");
const {
    db: { host, name },
} = require("../config/config.mysql");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
    `${name}`,
    `${process.env.DEV_DB_USER}`,
    `${process.env.DEV_DB_PASSWORD}`,
    {
        host: `${host}`,
        dialect: "mysql",
        logging: false,
    }
);

const db = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = db;
