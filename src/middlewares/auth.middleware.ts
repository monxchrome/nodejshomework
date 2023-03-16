import { NextFunction, Request, Response } from "express";

import { EToken } from "../enums";
import { ApiError } from "../errors";
import { Token } from "../models/Token.model";
import { tokenService } from "../services";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("Your access token is expired", 404);
      }

      const jwtPayload = tokenService.checkToken(accessToken);
      const tokenData = await Token.findOne({ accessToken }).populate(
        "_user_id"
      );

      if (!tokenData) {
        throw new ApiError("Access token is not valid", 401);
      }

      req.res.locals = { tokenData, jwtPayload, user: tokenData._user_id };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("Your refresh token has expired", 404);
      }

      const jwtPayload = tokenService.checkToken(refreshToken, EToken.refresh);
      const tokenData = await Token.findOne({ refreshToken });

      if (!tokenData) {
        throw new ApiError("Refresh token is not valid", 401);
      }

      req.res.locals = { tokenData, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
