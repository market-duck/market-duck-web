import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { ListItem } from '@market-duck/components/List/ListItem';
import { Meta } from '@storybook/react';

const meta = {
  title: 'UI Component/ListItem', //* Document, Tree 구조가 됨
  component: ListItem, //* 실제 작성한 컴포넌트
  parameters: {},
  tags: ['autodocs'],
} satisfies Meta<typeof ListItem>;

export const OnlyLeft = () => {
  return (
    <>
      <ListItem
        left={
          <Thumbnail imgSrc="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060" />
        }
        onClick={() => {
          alert('click!!');
        }}
      />
    </>
  );
};

export const BothSide = () => {
  return (
    <>
      <ListItem
        left={<span>왼쪽</span>}
        right={<span>오른쪽</span>}
        onClick={() => {
          alert('click!!');
        }}
      />
    </>
  );
};

export default meta;
