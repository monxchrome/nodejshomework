import { Types } from "mongoose";

import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async getByUserAndCar(carID: string, userID: string): Promise<ICar> {
    const result = await Car.aggregate([
      {
        $match: {
          // serarch for userID and carID
          _id: carID,
          user: new Types.ObjectId(userID),
        },
      },
      {
        $lookup: {
          from: "users", // model in db "users" (users model)
          localField: "user", // field in db "user".ref. (cars model)
          foreignField: "_id", // id of user
          as: "user", // name how in localField
        },
      },
      {
        $unwind: {
          // structure array of user is off
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return result[0];
  }
}

export const carRepository = new CarRepository();
