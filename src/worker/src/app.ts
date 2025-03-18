import express from "express";
import userRouter from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

export default app;