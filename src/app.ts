import { config } from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

config();

import { configs } from "./config/config";
import { userRouter } from "./routers/user.router";
import { IError } from "./types/common.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use((err: IError, req: Request, res: Response) => {
  const status = err.status;
  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on port: ${configs.PORT}`);
});
