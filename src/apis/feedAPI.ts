import { fetchClient } from '@market-duck/apis/fetchClient';
import { ReqFeedModelData } from '@market-duck/apis/models/FeedModel';
import { NetworkResultType } from '@market-duck/types/api';

class FeedAPI {
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
  async createFeed(feedData: ReqFeedModelData) {
    const { status } = await fetchClient.post('feed', feedData);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  async editFeed({ feedId, feedData }: { feedId: number; feedData: ReqFeedModelData }) {
    const { status } = await fetchClient.patch(`feed/${feedId}`, feedData);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  async deleteFeed({ feedId }: { feedId: number }) {
    const { status } = await fetchClient.delete(`feed/${feedId}`);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
}

export const feedAPI = new FeedAPI();
