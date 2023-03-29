import { model, Schema, Types } from "mongoose";

import { EActionToken } from "../enums";
import { User } from "./User.model";

const actionTokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    actionToken: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      enum: EActionToken,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Action = model("Action", actionTokenSchema);
