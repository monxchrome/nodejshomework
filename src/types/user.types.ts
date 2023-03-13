export enum EGenders {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  _id?: string;
  name: string;
  surname: string;
  gender: string;
  username: string;
  email: string;
  password: string;
}
