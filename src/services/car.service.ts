import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Car } from "../models";
import { carRepository } from "../repository";
import { ICar, IPaginationResponse, IQuery } from "../types";

class CarService {
  public async getAll(): Promise<ICar[]> {
    try {
      return Car.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(carID: string, userID: string): Promise<ICar> {
    try {
      return await carRepository.getByUserAndCar(carID, userID);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getPagination(
    query: IQuery
  ): Promise<IPaginationResponse<ICar>> {
    try {
      // tests methods, statics

      const testStatic = await Car.findByBrand("Stefan");
      // eslint-disable-next-line no-console
      console.log(testStatic);

      const testMethod = await Car.findById("640534e2638dd9cb6664ea88");
      // eslint-disable-next-line no-console
      console.log(testMethod.brandWithYear());

      const testVirtual = await Car.findById("640f5aa45ec89b0f0631273d");
      // eslint-disable-next-line no-console
      console.log(testVirtual.brandWithModel);

      // regular

      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`)
      );

      // --

      const {
        page = 1,
        limit = 5,
        sort = "createdAt",
        ...searchObject
      } = queryObj;

      const skip = limit * (page - 1);
      const cars = await Car.find(searchObject)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .lean(); // clear errors code
      const carsCount = await Car.count();

      return {
        page: +page,
        perPage: +limit,
        valueCount: carsCount,
        valueFound: cars.length,
        data: cars,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(data: ICar, userId: string) {
    try {
      return await Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(id: string, body: object) {
    try {
      return Car.findByIdAndUpdate({ _id: id }, { ...body }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string) {
    try {
      return Car.deleteOne({ _id: id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carService = new CarService();
