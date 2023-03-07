import { NextFunction, Request, Response } from "express";

import { User } from "../models/User.module";
import {ApiError} from "../errors/api.error";

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

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMW = new UserMiddleware();
