import { NextFunction, Request, Response } from "express";

import { carService } from "../services";
import { ICar, ICommonRes, IQuery, ITokenPayload } from "../types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car, jwtPayload } = res.locals;
      const result = await carService.getById(car._id, jwtPayload._id);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<ICar>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const car = await carService.create(req.body, _id);

      return res.status(200).json({
        message: "Car created",
        data: car,
      });
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<ICar>>> {
    try {
      const { carID } = req.params;
      const car = req.body;

      await carService.update(carID, car);

      return res.json({
        message: "Car updated",
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<ICar>>> {
    try {
      const { carID } = req.params;

      const deleteCar = await carService.delete(carID);
      return res.json({
        message: "Car deleted",
        data: deleteCar,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
