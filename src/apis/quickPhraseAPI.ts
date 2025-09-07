import { IAPIResponse, NetworkResultType } from '@market-duck/types/api';
import { fetchClient } from './fetchClient';
import { BaseQuickPhraseModel, IBaseQuickPhraseModelData } from './models/quickPhraseModel';

class QuickPhraseAPI {
  async getQuickPhrases({
    page,
    sortBy,
    category,
    keyword,
  }: {
    page: number;
    sortBy: 'createdAt' | 'useCount' | 'lastUsed';
    category?: string;
    keyword?: string;
  }) {
    const {
      data: { data, pageInfo },
    } = await fetchClient.get<IAPIResponse<IBaseQuickPhraseModelData[]>>(`/quick-phrases`, {
      params: {
        page,
        sortBy,
        category,
        keyword,
      },
    });

    return {
      quickPhrases: data.map((phrase) => BaseQuickPhraseModel.fromJson(phrase)),
      pageInfo,
    };
  }

  async getQuickPhraseDetail({ quickPhraseId }: { quickPhraseId: number }) {
    const {
      data: { data },
    } = await fetchClient.get<IAPIResponse<IBaseQuickPhraseModelData>>(`/quick-phrases/${quickPhraseId}`);
    return BaseQuickPhraseModel.fromJson(data);
  }

  async createQuickPhrase({ content, title, category }: { content: string; title: string; category: string }) {
    const { status, data } = await fetchClient.post(`/quick-phrases`, {
      content,
      title,
      category,
    });

    const isSuccess = status <= 299;

    return {
      success: isSuccess ? NetworkResultType.success : NetworkResultType.fail,
    };
  }

  async patchQuickPhrase({
    quickPhraseId,
    content,
    title,
    category,
  }: {
    quickPhraseId: number;
    content: string;
    title: string;
    category: string;
  }) {
    const { status, data } = await fetchClient.patch(`/quick-phrases/${quickPhraseId}`, {
      content,
      title,
      category,
    });

    const isSuccess = status <= 299;

    return {
      success: isSuccess ? NetworkResultType.success : NetworkResultType.fail,
    };
  }

  async deleteQuickPhrase({ quickPhraseId }: { quickPhraseId: number }) {
    //TODO:: delete response 가 다른 거랑 다름
    //   {
    //     "result": {
    //         "status": 200,
    //         "message": "Success"
    //     },
    //     "data": null
    // }
    const { status } = await fetchClient.delete(`/quick-phrases/${quickPhraseId}`);
    const isSuccess = status <= 299;

    return {
      success: isSuccess ? NetworkResultType.success : NetworkResultType.fail,
    };
  }

  async addQuickPhraseUseCount({ quickPhraseId }: { quickPhraseId: number }) {
    const { status, data } = await fetchClient.patch(`/quick-phrases/${quickPhraseId}/use`);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  //   async getQuickPhraseStats({ userId }: { userId: number }) {
  //     const { data } = await fetchClient.delete(`/quick-phrases/stats`);
  //     return data
  //   }

  //   async getCategoriesWithQuickPhrases(user: IUserModelData) {
  //     const { data } = await fetchClient.get(`/quick-phrases/categories`, {
  //       params:{ user}
  //     });
  //     return data;
  //   }
}

export const quickPhraseAPI = new QuickPhraseAPI();
