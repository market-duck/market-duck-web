import { Tag } from '@market-duck/components/Tag/Tag';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Component/Tag', //* Document, Tree 구조가 됨
  component: Tag, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onDelete: fn(() => {
      console.log('delete!');
    }),
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    text: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    text: 'secondary',
  },
};
