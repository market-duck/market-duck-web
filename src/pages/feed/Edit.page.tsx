import { FeedDetailModel } from '@market-duck/apis/models/feedModel';
import { useLocation } from 'react-router-dom';
import { FeedForm } from './components/FeedForm';

export const Edit = () => {
  const { state: feedDetail } = useLocation();

  const { feedId, title, price, content, goodsCategory, genreCategory, images } = feedDetail as FeedDetailModel;
  const editData = {
    feedId,
    genre: genreCategory,
    goods: goodsCategory,
    title,
    price: `${price}`,
    content,
    images: images.map((item) => item.fileUrl),
  };

  return <FeedForm type="edit" editData={editData} />;
};
