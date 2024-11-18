import { fetchClient } from '@market-duck/apis/fetchClient';
import { NetworkResultType } from '@market-duck/types/api';

class FeedAPI {
  //TODO:: 체크하기 - 새롭게 업로드시에 다중 업로드 & 피드 수정시에 추가 업로드도 가능
  async uploadFeedImages({ feedId, imgList }: { feedId: number; imgList: File[] }) {
    const file = new FormData();
    imgList.forEach((item) => file.append('file', item));
    const { status } = await fetchClient.post(`feed/image/${feedId}`, file);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  //TODO:: API 변경 체크
  async deleteFeedImages({ feedId, index }: { feedId: number; index: number }) {
    const { status } = await fetchClient.patch(`/feed/${feedId}/${index}}`, { feedId, index });

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  async createFeed(feedData: {
    title: string;
    content: string;
    price: number;
    feedStatus: 'ON_SALE' | '';
    feedGoodsCategories: Array<{
      categoryId: number;
      categoryType: 'GOODS';
    }>;
    feedGenreCategories: Array<{
      categoryId: number;
      categoryType: 'GOODS';
    }>;
  }) {
    const { status } = await fetchClient.post('feed', feedData);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  async editFeed({
    feedId,
    feedData,
  }: {
    feedId: number;
    feedData: {
      title: string;
      content: string;
      price: number;
      feedStatus: 'ON_SALE' | '';
      feedGoodsCategories: Array<{
        categoryId: number;
        categoryType: 'GOODS';
      }>;
      feedGenreCategories: Array<{
        categoryId: number;
        categoryType: 'GOODS';
      }>;
    };
  }) {
    const { status } = await fetchClient.patch(`feed/${feedId}`, feedData);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
  async deleteFeed({ feedId }: { feedId: number }) {
    const { status } = await fetchClient.delete(`feed/${feedId}`);

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
}

export const feedAPI = new FeedAPI();
