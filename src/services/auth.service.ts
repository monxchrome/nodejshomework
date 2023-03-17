import { EActionToken } from "../enums/action-token.enum";
import { EEmailEnum } from "../enums/email.enum";
import { ESmsEnum } from "../enums/sms.enum";
import { ApiError } from "../errors";
import { User } from "../models";
import { Action } from "../models/Action.model";
import { Token } from "../models/Token.model";
import { ITokenPair, ITokenPayload, IUser } from "../types";
import { ICredentials } from "../types/auth.types";
import { emailService } from "./email.service";
import { passwordService } from "./oauth.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;

      const hashedPassword = await passwordService.hash(password);
      await User.create({
        ...body,
        password: hashedPassword,
      });

      await smsService.sendSms("+38268256871", ESmsEnum.REGISTER);
      await emailService.sendEmail("inacheat@gmail.com", EEmailEnum.REGISTER); // body.email
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 400);
      }

      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });

      // save token in db

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenData: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenData.refreshToken }),
      ]);

      return tokenPair;
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
      await emailService.sendEmail(user.email, EEmailEnum.CHANGED_PASSWORD);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionToken.forgot
      );

      await Action.create({
        actionToken,
        tokenType: EActionToken.forgot,
        _user_id: user._id,
      });

      await emailService.sendEmail(user.email, EEmailEnum.FORGOT_PASSWORD, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activateEmail(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionToken.activate
      );

      await emailService.sendEmail(user.email, EEmailEnum.ACTIVATE_EMAIL, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(password: string, id: string): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);
      await User.updateOne({ _id: id }, { password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
