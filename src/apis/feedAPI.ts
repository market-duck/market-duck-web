import { fetchClient, openFetchClient } from '@market-duck/apis/fetchClient';
import { FeedDetailModel, FeedModel, IFeedDetailModelData, IFeedModelData } from '@market-duck/apis/models/feedModel';
import { IAPIResponse, NetworkResultType } from '@market-duck/types/api';
import { FeedStatusType, ReqFeedDataType } from '@market-duck/types/feed';

class FeedAPI {
  async getFeeds({ page, genreIds, goodsIds }: { page: number; genreIds?: number[]; goodsIds?: number[] }) {
    const genreIdToString = genreIds?.join(',');
    const goodsIdsToString = goodsIds?.join(',');
    const {
      data: { data, pageInfo },
    } = await openFetchClient.get<IAPIResponse<IFeedModelData[]>>(
      `/feed?page=${page}&genreIds=${genreIdToString ?? ''}&goodsIds=${goodsIdsToString ?? ''}`,
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
  async deleteFeedImages({ feedId, indexIdList }: { feedId: number; indexIdList: number[] }) {
    const { status } = await fetchClient.patch('/feed/image', { feedId, indexIdList });
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  async createFeed(feedData: ReqFeedDataType) {
    const { status, data } = await fetchClient.post('feed', feedData);
    const isSuccess = status <= 299;

    return {
      success: isSuccess ? NetworkResultType.success : NetworkResultType.fail,
      feedId: isSuccess ? data.data.feedId : null,
    };
  }

  async editFeed({ feedId, feedData }: { feedId: number; feedData: ReqFeedDataType }) {
    const { status, data } = await fetchClient.patch(`feed/${feedId}`, feedData);
    const isSuccess = status <= 299;
    return {
      success: isSuccess ? NetworkResultType.success : NetworkResultType.fail,
      feedId: isSuccess ? data.data.feedId : null,
    };
  }

  async editFeedStatus({ feedId, feedStatus }: { feedId: number; feedStatus: FeedStatusType }) {
    const { status } = await fetchClient.patch(`feed/${feedId}`, { feedStatus });
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  async deleteFeed({ feedId }: { feedId: number }) {
    const { status } = await fetchClient.delete(`feed/${feedId}`);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  // TODO: 찜 기능 API 작성 필요
}

export const feedAPI = new FeedAPI();
