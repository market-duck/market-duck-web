import { openFetchClient } from '@market-duck/apis/fetchClient';
import { CategoryModel } from '@market-duck/apis/models/CategoryModel';
import { IAPIResponse } from '@market-duck/types/api';
import { CategoryType } from '@market-duck/types/category';

class CategoryAPI {
  async getCategoryList({
    page,
    size,
    categoryName,
    categoryType,
  }: {
    page: number;
    size: number;
    categoryName: string;
    categoryType: CategoryType;
  }) {
    const {
      data: { data },
    } = await openFetchClient.get<IAPIResponse<any>>(`category`, {
      params: {
        page,
        size,
        categoryName,
        categoryType,
      },
    });
    return data.map((item: any) => CategoryModel.fromJson(item));
  }
}

export const categoryAPI = new CategoryAPI();
