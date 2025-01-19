import { FeedDetailModel } from '@market-duck/apis/models/feedModel';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useLocation } from 'react-router-dom';
import { FeedForm } from './components/FeedForm';

export const Edit = () => {
  const { state: feedDetail } = useLocation();

  const { title, price, content, goodsCategory, genreCategory } = feedDetail as FeedDetailModel;
  const editData = {
    genre: genreCategory.map((category) => ({ label: category.categoryName, value: `${category.categoryId}` })),
    goods: goodsCategory.map((category) => ({ label: category.categoryName, value: `${category.categoryId}` })),
    title,
    price: `${price}`,
    content,
  };

  return (
    <>
      <NavigationTop leftButtonIconType="back" title="피드 수정" rightButton={<></>} />
      <AppGutter>
        <FeedForm type="edit" editData={editData} />
      </AppGutter>
    </>
  );
};
