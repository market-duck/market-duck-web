import { Card } from '@market-duck/components/Card/Card';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Component/Card', //* Document, Tree 구조가 됨
  component: Card, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    title: '하이큐 굿즈 일괄 처분',
    price: 30000,
    tagList: ['하이큐', '소년만화'],
    status: 'processing',
    createdAt: new Date(),
    viewCount: 10,
    likedCount: 3,
    imgSrc:
      'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
  },
};
