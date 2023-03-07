export enum EGenders {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  name: string;
  surname: string;
  gender: string;
  username: string;
  email: string;
  password: string;
}

export interface ICommonRes<T> {
  message: string;
  data: T;
}
