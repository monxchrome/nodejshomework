import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { IPaginationResponse, IQuery } from "../types/pagination.types";

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

  public async getPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      // tests methods, statics

      const testStatic = await User.findByName("Stefan");
      console.log(testStatic);

      const testMethod = await User.findById("640534e2638dd9cb6664ea88");
      console.log(testMethod.nameWithAge());

      const testVirtual = await User.findById("640f5aa45ec89b0f0631273d");
      console.log(testVirtual.nameWithSurname);

      // regular

      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      // --

      const {
        page = 1,
        limit = 5,
        sort = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);
      const users = await User.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean(); // clear errors code
      const usersCount = await User.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: usersCount,
        valueFound: users.length,
        data: users,
      };
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
