import { model, Schema } from "mongoose";

import { EGenders } from "../enums";
import { EUserStatus } from "../enums/user-status.enum";

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username should be unique"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
  },
  { versionKey: false }
);

export const User = model("user", userSchema);
