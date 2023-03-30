import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../config";
import { ApiError } from "../errors";

class FileMiddleware {
  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiError("Files is not upload", 400);
      }

      if (Array.isArray(req.files.avatar)) {
        throw new ApiError("You can upload only one file", 400);
      }

      const { size, mimetype, name } = req.files.avatar;

      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError(`Your file ${name} is too big`, 400);
      }

      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError(
          `File must be .jpg, .jpeg, .png, .gif. Your file ${name} has invalid format`,
          400
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
