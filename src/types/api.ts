export interface IAPIResponse<T = any> {
  result: {
    status: number;
    message: string;
  };
  data: T;
  pageInfo?: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export enum NetworkResultType {
  success = 'success',
  fail = 'fail',
}
