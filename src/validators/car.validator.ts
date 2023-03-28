import * as Joi from "joi";

export class CarValidator {
  private static brand = Joi.string().min(1).max(20).trim();
  private static model = Joi.string().min(1).max(20).trim();
  private static year = Joi.number().min(1990).max(new Date().getFullYear());

  static create = Joi.object({
    brand: this.brand.required(),
    model: this.model.required(),
    year: this.year.required(),
  });

  static update = Joi.object({
    brand: this.brand,
    model: this.model,
    year: this.year,
  });
}
