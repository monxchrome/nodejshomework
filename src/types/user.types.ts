import { Model } from "mongoose";

export interface IUser {
  _id?: string;
  name: string;
  surname: string;
  gender: string;
  age: number;
  username: string;
  phone: string;
  email: string;
  avatar?: string;
  password: string;
}

interface IUserMethods {
  nameWithAge(): void;
}

interface IUserVirtual {
  nameWithSurname: string;
}

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtual> {
  findByName(name: string): Promise<IUser[]>;
}
