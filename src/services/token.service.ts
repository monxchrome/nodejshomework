import * as jwt from "jsonwebtoken";

import { configs } from "../config";
import { EActionToken, EToken } from "../enums";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: EActionToken
  ): string {
    let secret = "";

    try {
      switch (tokenType) {
        case EActionToken.activate:
          secret = configs.ACTIVATE_SECRET;
          break;

        case EActionToken.forgot:
          secret = configs.FORGOT_SECRET;
          break;
      }

      return jwt.sign(payload, secret, { expiresIn: "7d" });
    } catch (e) {
      throw new ApiError("Action token not valid", 401);
    }
  }

  public checkToken(token: string, tokenType = EToken.access): ITokenPayload {
    let secret = "";

    try {
      switch (tokenType) {
        case EToken.access:
          secret = configs.ACCESS_SECRET;
          break;

        case EToken.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public checkActionToken(token: string, tokenType: EActionToken) {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionToken.forgot:
          secret = configs.FORGOT_SECRET;
          break;
        case EActionToken.activate:
          secret = configs.ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Action token is not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
