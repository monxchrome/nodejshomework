import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { ICommonRes } from "../types/common.types";
import { IUser } from "../types/user.types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAll();
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

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<IUser>>> {
    try {
      const body = req.body;
      await userService.create(body);

      return res.status(200).json({
        message: "User created",
      });
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
      const { userID } = req.params;
      const user = req.body;

      await userService.update(userID, user);

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
