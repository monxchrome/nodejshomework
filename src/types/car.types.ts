import { Model, Types } from "mongoose";

import { IUser } from "./user.types";

export interface ICar {
  _id?: Types.ObjectId;
  brand: string;
  model: string;
  year: number;
  user: IUser | Types.ObjectId;
}

interface ICarMethods {
  brandWithYear(): void;
}

interface ICarVirtual {
  brandWithModel: string;
}

export interface ICarModel
  extends Model<ICar, object, ICarMethods, ICarVirtual> {
  findByBrand(brand: string): Promise<ICar[]>;
}
