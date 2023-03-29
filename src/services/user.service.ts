import { ApiError } from "../errors";
import { User } from "../models";
import { IPaginationResponse, IQuery, IUser } from "../types";

class UserService {
  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id).lean();
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
      // eslint-disable-next-line no-console
      console.log(testStatic);

      const testMethod = await User.findById("640534e2638dd9cb6664ea88");
      // eslint-disable-next-line no-console
      console.log(testMethod.nameWithAge());

      const testVirtual = await User.findById("640f5aa45ec89b0f0631273d");
      // eslint-disable-next-line no-console
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

  public async update(userID: string, data: Partial<IUser>): Promise<void> {
    try {
      return User.findByIdAndUpdate(userID, data, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(userID: string): Promise<void> {
    try {
      await User.deleteOne({ _id: userID });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
