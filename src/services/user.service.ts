import { ApiError } from "../errors/api.error";
import { User } from "../models/User.module";
import { IUser } from "../types/user.types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(body: object) {
    try {
      return User.create(body);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(id: string, body: object) {
    try {
      return User.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string) {
    try {
      return User.deleteOne({ _id: id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
