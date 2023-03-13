export interface IError extends Error {
  status: number;
}

export interface IMessage {
  message: string;
}

export interface ICommonRes<T> extends IMessage {
  data: T;
}

interface IIndex {
  [key: string]: any; // first key is string ( email or etc.) second key is any ( body )
}

export type IRequest = IIndex;
