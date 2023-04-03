import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import * as http from "http";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./config";
import { cronRunner } from "./cron";
import { authRouter, carRouter, userRouter } from "./router";
import { IError } from "./types";
import * as swaggerJson from "./utils/swagger.json";

config();

const app: Application = express();
const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// on connection
io.on("connection", (socket: Socket) => {
  /** send to particular client */
  // socket.emit("message", { message: "hello" });
  /** send to all clients */
  // io.emit("user:connected", { message: "user has been connected" });
  /** send to all clients except sender */
  // socket.broadcast.emit("user:connected", {
  //   message: "user broadcast connected",
  // });

  socket.on("message:send", (text) => {
    io.emit("message:get", `socketid - ${socket.id} and ${text}`);
  });

  socket.on("disconnect", () => {
    // eslint-disable-next-line no-console
    console.log(`${socket.id} has been disconnected`);
  });

  socket.on("join:room", ({ roomID }) => {
    socket.join(roomID);

    socket
      .to(roomID)
      .emit("user:joined", { socketID: socket.id, action: "joined" });
  });

  socket.on("leave:room", ({ roomID }) => {
    socket.leave(roomID);
    socket
      .to(roomID)
      .emit("user:left", { socketID: socket.id, action: "leaved" });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/users", userRouter);
app.use("/cars", carRouter);
app.use("/auth", authRouter);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

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
