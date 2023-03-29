import { model, Schema, Types } from "mongoose";

import { ICar, ICarModel } from "../types";
import { User } from "./User.model";

export const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    model: {
      type: String,
      required: [true, "Model is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    user: {
      type: Types.ObjectId,
      required: [true, "REF: User is required"],
      ref: User,
    },
  },
  { versionKey: false, timestamps: true }
);

// statics use all model from db (users)
carSchema.statics = {
  async findByBrand(brand: string): Promise<ICar[]> {
    return this.find({ brand });
  },
};

// methods use only examples from model (_id, name, age, status, etc.)
carSchema.methods = {
  brandWithYear() {
    return `${this.brand} ${this.model}, user is ${this.user} and year is ${this.year}`;
  },
};

// added new VIRTUAL field in db
carSchema.virtual("brandWithModel").get(function () {
  return `${this.brand} ${this.model}`;
});

export const Car = model<ICar, ICarModel>("car", carSchema);
