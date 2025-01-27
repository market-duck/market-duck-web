import { openFetchClient } from '@market-duck/apis/fetchClient';
import { CategoryModel, ICategoryModelData } from '@market-duck/apis/models/categoryModel';
import { IAPIResponse } from '@market-duck/types/api';
import { CategoryType } from '@market-duck/types/category';

class CategoryAPI {
  async getCategoryList(params: { page?: number; size?: number; categoryName?: string; categoryType: CategoryType }) {
    const {
      data: { data },
    } = await openFetchClient.get<IAPIResponse<ICategoryModelData[]>>(`category`, {
      params,
    });
    return data.map((item) => CategoryModel.fromJson(item));
  }
}

export const categoryAPI = new CategoryAPI();
