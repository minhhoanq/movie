const dev = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        host: process.env.DEV_DB_HOST || "localhost",
        port: process.env.DEV_DB_PORT || 3306,
        name: process.env.DEV_DB_NAME || "movie",
    },
};

const prod = {
    app: {
        port: process.env.DEV_APP_PORT,
    },
    db: {
        host: process.env.PROD_DB_HOST || "localhost",
        port: process.env.PROD_DB_PORT || 3306,
        name: process.env.PROD_DB_NAME || "movieProd",
    },
};

const config = { dev, prod };
const env = process.env.NODE_ENV || "dev";

module.exports = config[env];
