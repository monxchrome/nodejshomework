export interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  valueCount: number;
  valueFound: number;
  data: T[];
}

export interface IQuery {
  page: number;
  limit: number;
  sort: string;

  [key: string]: string | number;
}
