import { NextFunction, Request, Response } from "express";

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

      return res.json(user);
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

      await userService.update(params.userID, body);

      return res.json({
        message: "User updated",
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
}

export const userController = new UserController();
