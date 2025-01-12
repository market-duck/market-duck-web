import { CategoryModel } from '@market-duck/apis/models/categoryModel';

export type FeedStatusType =
  | 'ON_SALE'
  | 'IN_TRANSACTION'
  | 'SOLD_OUT'
  | 'SALE_STOPPED'
  | 'DELETED_BY_ADMIN'
  | 'DELETED';

type CategoryReqType = Omit<CategoryModel, 'categoryName'>;

export interface ReqFeedDataType {
  title: string;
  content: string;
  price: number;
  feedStatus: FeedStatusType;
  goodsCategories: Array<CategoryReqType>;
  genreCategories: Array<CategoryReqType>;
}
