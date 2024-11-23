import { CategoryType } from '@market-duck/types/category';

export interface ICategoryModelData {
  categoryId: number;
  categoryName: string;
  categoryType: CategoryType;
}

export class CategoryModel {
  categoryId: number;
  categoryName: string;
  categoryType: CategoryType;

  constructor(data: ICategoryModelData) {
    this.categoryId = data.categoryId;
    this.categoryName = data.categoryName;
    this.categoryType = data.categoryType;
  }

  static fromJson(data: ICategoryModelData) {
    return new CategoryModel(data);
  }
}
