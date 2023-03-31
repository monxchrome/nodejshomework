import { configs } from "../config";
import { IUser } from "../types";

export class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      username: user.username,
      age: user.age || null,
      avatar: user.avatar
        ? `${configs.AWS_S3_BUCKET_URL}/${user.avatar}`
        : null,
      email: user.email,
    };
  }
}

export const userMapper = new UserMapper();
