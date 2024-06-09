import { NotifyList, NotifyListItem } from '@market-duck/components/List/NotifyList';
import { Meta } from '@storybook/react';

const meta = {
  title: 'UI Component/NotifyList', //* Document, Tree 구조가 됨
  component: NotifyListItem, //* 실제 작성한 컴포넌트
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof NotifyListItem>;

const data = [
  {
    content: '알림 내용1',
    createdAt: new Date(),
    imgSrc:
      'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
  },
  {
    content: '알림 내용2',
    createdAt: new Date(),
    imgSrc:
      'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
  },
];

export const Left = () => {
  return (
    <>
      <NotifyList data={data} />
    </>
  );
};
export const Right = () => {
  return (
    <>
      <NotifyList data={data} area="right" />
    </>
  );
};
export const None = () => {
  return (
    <>
      <NotifyList data={data} area="none" />
    </>
  );
};

export default meta;
