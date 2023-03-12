export interface IError extends Error {
  status: number;
}

export interface IMessage {
  message: string;
}

export interface ICommonRes<T> extends IMessage {
  data: T;
}
