import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors";
import { User } from "../models";
import { IPaginationResponse, IQuery, IUser } from "../types";
import { s3Service } from "./s3.service";

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

  public async update(userID: string, data: Partial<IUser>): Promise<IUser> {
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

  public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(file, "user", user._id);

      if (user.avatar) {
        await s3Service.deleteAvatar(user.avatar);
      }

      return await User.findByIdAndUpdate(
        user._id,
        { avatar: filePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteAvatar(user: IUser): Promise<IUser> {
    try {
      if (!user.avatar) {
        throw new ApiError("User doesnt have avatar", 422);
      }

      await s3Service.deleteAvatar(user.avatar);

      return await User.findByIdAndUpdate(
        user._id,
        { $unset: { avatar: user.avatar } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
