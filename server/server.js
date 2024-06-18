import app from "./src/index.js";
import dotenv from "dotenv";
dotenv.config();

const server = app.listen(process.env.PORT, () => {
    console.log(`Web server start with: ${process.env.PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log(`Exit server express.`));
});
