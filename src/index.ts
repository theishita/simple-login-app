import express from "express";
import { connectToDatabase } from "./services/database.service"
import { userRouter } from "./routes/user.router";

const app = express();
const port = 3000;

connectToDatabase()
    .then(() => {
        app.use("/", userRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });