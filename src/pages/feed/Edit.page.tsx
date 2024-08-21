import { FeedForm } from './components/FeedForm';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';

export const Edit = () => {
  const editData = {
    genre: [{ label: '장르1', value: 'genre1' }],
    goods: [{ label: '장르1', value: 'genre1' }],
    title: '입력된 제목',
    price: '10000',
    content: '입력된 콘텐츠\n',
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
