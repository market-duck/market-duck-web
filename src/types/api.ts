export interface IAPIResponse<T = any> {
  result: {
    status: number;
    message: string;
  };
  data: T;
}

export enum NetworkResultType {
  success = 'success',
  fail = 'fail',
}
