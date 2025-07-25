import { CategoryModel } from '@market-duck/apis/models/categoryModel';

export type FeedStatusType =
  | 'ON_SALE_OR_BUY'
  | 'IN_TRANSACTION'
  | 'SOLD_OUT'
  | 'STOPPED'
  | 'DELETED_BY_ADMIN'
  | 'DELETED';

export type FeedType = 'SALE' | 'BUY';

type CategoryReqType = Omit<CategoryModel, 'categoryName'>;

export interface FeedFormData {
  genre: Array<CategoryModel>;
  goods: Array<CategoryModel>;
  title: string;
  price: string;
  content: string;
}

export interface ReqFeedDataType {
  title: string;
  content: string;
  price: number;
  feedStatus: FeedStatusType;
  feedType: FeedType;
  goodsCategories: Array<CategoryReqType>;
  genreCategories: Array<CategoryReqType>;
}
