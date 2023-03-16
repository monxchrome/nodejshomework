import { EEmailEnum } from "../enums/email.enum";
import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./oauth.service";
import {smsService} from "./sms.service";
import {ESmsEnum} from "../enums/sms.enum";

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

  public async changePassword(
    userID: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await User.findById(userID);
      const isMatched = await passwordService.compare(
        oldPassword,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Wrong old password", 401);
      }

      const hashNewPassword = await passwordService.hash(newPassword);
      await User.updateOne({ _id: user._id }, { password: hashNewPassword });

      await smsService.sendSms("+38268256871", ESmsEnum.CHANGED_PASSWORD);
      await emailService.sendEmail(
        "inacheat@gmail.com",
        EEmailEnum.CHANGED_PASSWORD
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
