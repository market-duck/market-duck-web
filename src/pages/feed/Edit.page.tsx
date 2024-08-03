import { FeedForm } from './components/FeedForm';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';

export const Edit = () => {
  const initialValue = {
    genre: [{ label: '장르1', value: 'genre1' }],
    goods: [{ label: '장르1', value: 'genre1' }],
    title: '입력된 제목',
    price: 10000,
    content: '입력된 콘텐츠\n',
  };

  return (
    <AppGutter>
      <FeedForm type="edit" initialValue={initialValue} />
    </AppGutter>
  );
};
