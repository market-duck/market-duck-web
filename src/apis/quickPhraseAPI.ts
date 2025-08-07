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
    } = await fetchClient.get<IAPIResponse<IBaseQuickPhraseModelData[]>>(`/api/quick-phrases`, {
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
    } = await fetchClient.get<IAPIResponse<IBaseQuickPhraseModelData>>(`/api/quick-phrases/${quickPhraseId}`);
    return BaseQuickPhraseModel.fromJson(data);
  }

  async createQuickPhrase({ content, title, category }: { content: string; title: string; category: string }) {
    const { status, data } = await fetchClient.post(`/api/quick-phrases`, {
      content,
      title,
      category,
    });

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
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
    const { status, data } = await fetchClient.patch(`/api/quick-phrases/${quickPhraseId}`, {
      content,
      title,
      category,
    });
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  async deleteQuickPhrase({ quickPhraseId }: { quickPhraseId: number }) {
    const { status } = await fetchClient.delete(`/api/quick-phrases/${quickPhraseId}`);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  async addQuickPhraseUseCount({ quickPhraseId }: { quickPhraseId: number }) {
    const { status, data } = await fetchClient.patch(`/api/quick-phrases/${quickPhraseId}/use`);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  //   async getQuickPhraseStats({ userId }: { userId: number }) {
  //     const { data } = await fetchClient.delete(`/api/quick-phrases/stats`);
  //     return data
  //   }

  //   async getCategoriesWithQuickPhrases(user: IUserModelData) {
  //     const { data } = await fetchClient.get(`/api/quick-phrases/categories`, {
  //       params:{ user}
  //     });
  //     return data;
  //   }
}

export const quickPhraseAPI = new QuickPhraseAPI();
