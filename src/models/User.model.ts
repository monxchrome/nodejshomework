import { model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";
import { IUser, IUserModel } from "../types";

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
    age: {
      type: Number,
      required: false,
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
    phone: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
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
  { versionKey: false, timestamps: true }
);

// statics use all model from db (users)
userSchema.statics = {
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};

// methods use only examples from model (_id, name, age, status, etc.)
userSchema.methods = {
  nameWithAge() {
    return `${this.name} ${this.surname}, username is ${this.username} and user is ${this.age} years old`;
  },
};

// added new VIRTUAL field in db
userSchema.virtual("nameWithSurname").get(function () {
  return `${this.name} ${this.surname}`;
});

export const User = model<IUser, IUserModel>("user", userSchema);
