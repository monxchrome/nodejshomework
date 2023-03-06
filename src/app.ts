import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "./models/User.module";
import { IUser } from "./types/user.types";

const app = express();
const PORT = 5100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log(`Server has started on port: ${PORT}`);
});

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      return res.json({
        message: e.message,
      });
    }
  }
);

app.get("/users/:userID", async (req, res): Promise<Response<IUser>> => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID);
    return res.json(user);
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});

app.post("/users", async (req, res): Promise<Response<IUser>> => {
  try {
    const body = req.body;
    const user = await User.create({ ...body });

    return res.status(200).json({
      message: "User created",
      data: user,
    });
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});

app.put("/users/:userID", async (req, res): Promise<Response<IUser>> => {
  const { userID } = req.params;
  const updatedUser = req.body;

  try {
    const updateUser = await User.updateOne({ _id: userID }, updatedUser);
    return res.json(updateUser);
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});

app.delete("/users/:userID", async (req, res): Promise<Response<IUser>> => {
  const { userID } = req.params;

  try {
    const deleteUser = await User.deleteOne({ _id: userID });
    return res.json(deleteUser);
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});
