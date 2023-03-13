import bcrypt from "bcrypt";

import { SaltConstants } from "../config/constants/salt.constants";

class PasswordService {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, +SaltConstants.PASSWORD_SALT);
  }

  public async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
