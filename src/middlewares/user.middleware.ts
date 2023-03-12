import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { User } from "../models/User.module";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getByIdError(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userID } = req.params;

      const user = await User.findById(userID);

      if (!user) {
        throw new ApiError("User not found!", 404);
      }

      res.locals.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.create.validate(req.body);

      if (error) {
        return next(new ApiError(error.message, 405));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isIDValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userID)) {
        return next(new ApiError("UserID is not valid", 422));
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.update.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMW = new UserMiddleware();
