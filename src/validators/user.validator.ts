import * as Joi from "joi";

import { regexConstants } from "../config";
import { EGenders } from "../enums";

export class UserValidator {
  private static firstName = Joi.string().min(1).max(20).trim();
  private static lastName = Joi.string().min(1).max(20).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));
  private static username = Joi.string().min(3).max(10);

  static create = Joi.object({
    name: this.firstName.required(),
    surname: this.lastName.required(),
    gender: this.gender,
    username: this.username.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = Joi.object({
    gender: this.gender,
    username: this.username,
    email: this.email,
    password: this.password,
  });

  static changePassword = Joi.object({
    oldPassword: this.password,
    newPassword: this.password,
  });
}
