import { FeedStatusType } from '@market-duck/types/feed';
import { CategoryType } from '@market-duck/types/category';

interface CategoryModel {
  categoryId: number;
  categoryType: CategoryType;
}

//TODO:: require, optional, initializing for empty value?
export interface ReqFeedModelData {
  title: string;
  content: string;
  price: number;
  feedStatus: FeedStatusType;
  feedGoodsCategories: Array<CategoryModel>;
  feedGenreCategories: Array<CategoryModel>;
}
