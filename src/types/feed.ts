import { CategoryModel } from '@market-duck/apis/models/categoryModel';

export type FeedStatusType =
  | 'ON_SALE_OR_BUY'
  | 'IN_TRANSACTION'
  | 'SOLD_OUT'
  | 'STOPPED'
  | 'DELETED_BY_ADMIN'
  | 'DELETED';

export interface ReqFeedDataType {
  title: string;
  content: string;
  price: number;
  feedStatus: FeedStatusType;
  feedGoodsCategories: Array<CategoryModel>;
  feedGenreCategories: Array<CategoryModel>;
}
