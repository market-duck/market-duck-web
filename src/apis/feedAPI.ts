import { openFetchClient } from '@market-duck/apis/fetchClient';
import { FeedDetailModel, FeedModel, IFeedDetailModelData, IFeedModelData } from '@market-duck/apis/models/feedModel';
import { IAPIResponse } from '@market-duck/types/api';

class FeedAPI {
  async getFeeds({ page, genreIds, goodsIds }: { page: number; genreIds?: number[]; goodsIds?: number[] }) {
    const genreIdToString = genreIds?.join(',');
    const goodsIdsToString = goodsIds?.join(',');
    const {
      data: { data, pageInfo },
    } = await openFetchClient.get<IAPIResponse<IFeedModelData[]>>(
      `/feed?page=${page}&genreIds=${genreIdToString}&goodsIds=${goodsIdsToString}`,
    );
    return {
      feeds: data.map((feed) => FeedModel.fromJson(feed)),
      pageInfo,
    };
  }

  async getFeedDetail({ feedId }: { feedId: number }) {
    const {
      data: { data },
    } = await openFetchClient.get<IAPIResponse<IFeedDetailModelData>>(`/feed/detail/${feedId}`);
    return FeedDetailModel.fromJson(data);
  }
}

export const feedAPI = new FeedAPI();
