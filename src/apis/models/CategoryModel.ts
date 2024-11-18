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

  // JSON에서 유저 모델 생성
  static fromJson(data: ICategoryModelData): CategoryModel {
    return new CategoryModel(data);
  }
}
