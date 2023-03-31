import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userMapper } from "../mapper";
import { userService } from "../services";
import { ICommonRes, IQuery, IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;

      const response = userMapper.toResponse(user);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IUser>>> {
    try {
      const { params, body } = req;

      const updatedUser = await userService.update(params.userID, body);

      const response = userMapper.toResponse(updatedUser);

      return res.json({
        message: "User updated",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IUser>>> {
    try {
      const { userID } = req.params;

      const deleteUser = await userService.delete(userID);
      return res.json({
        message: "User deleted",
        data: deleteUser,
      });
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { user: userEntity } = res.locals;
      const avatar = req.files.avatar as UploadedFile;

      const user = await userService.uploadAvatar(avatar, userEntity);

      const response = userMapper.toResponse(user);

      return res.status(201).json({
        message: "Avatar is uploaded",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const userEntity = res.locals.user as IUser;

      const user = await userService.deleteAvatar(userEntity);

      const response = userMapper.toResponse(user);

      return res.status(201).json({
        message: "User avatar has been deleted",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
