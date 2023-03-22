import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

config();

import { configs } from "./config";
import { authRouter } from "./router";
import { userRouter } from "./router";
import { adminRouter } from "./router/admin.router";
import { IError } from "./types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/users", userRouter);
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
  console.log(`Server has started on port: ${configs.PORT}`);
});
