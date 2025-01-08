import { fetchClient } from '@market-duck/apis/fetchClient';
import { NetworkResultType } from '@market-duck/types/api';
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

  //새롭게 업로드시 & 피드 수정시에 추가 업로드도 가능
  async uploadFeedImages({ feedId, imgList }: { feedId: number; imgList: File[] }) {
    const file = new FormData();
    imgList.forEach((item) => file.append('file', item));
    const { status } = await fetchClient.post(`feed/image/${feedId}`, file);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  //특정 피드의 업로드된 이미지 리스트에서 특정 인덱스에 해당하는 이미지를 제거한다
  async deleteFeedImages({ feedId, index }: { feedId: number; index: number }) {
    const { status } = await fetchClient.patch(`/feed/${feedId}/${index}}`, { feedId, index });

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  //TODO:: any
  async createFeed(feedData: any) {
    const { status } = await fetchClient.post('feed', feedData);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  //TODO:: any
  async editFeed({ feedId, feedData }: { feedId: number; feedData: any }) {
    const { status } = await fetchClient.patch(`feed/${feedId}`, feedData);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  async deleteFeed({ feedId }: { feedId: number }) {
    const { status } = await fetchClient.delete(`feed/${feedId}`);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
}

export const feedAPI = new FeedAPI();
