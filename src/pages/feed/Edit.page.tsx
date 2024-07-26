import { FeedForm } from './components/FeedForm';

export const Edit = () => {
  const initialValue = {
    genre: [],
    goods: [],
    title: '입력된 제목',
    content: '입력된 콘텐츠\n',
  };

  return <FeedForm type="edit" initialValue={initialValue} />;
};
