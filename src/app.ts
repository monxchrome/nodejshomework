import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import mongoose from "mongoose";

import { configs } from "./config";
import { cronRunner } from "./cron";
import { authRouter, carRouter, userRouter } from "./router";
import { IError } from "./types";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 400;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  cronRunner();
  // eslint-disable-next-line no-console
  console.log(`Server has started on port: ${configs.PORT}`);
});
