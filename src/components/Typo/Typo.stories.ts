import { Typo } from '@market-duck/components/Typo/Typo';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Component/Typo', //* Document, Tree 구조가 됨
  component: Typo, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  args: { tag: 'span', children: 'test Text' },
  tags: ['autodocs'],
} satisfies Meta<typeof Typo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Typos: Story = {
  args: {
    type: 'BODY_MD',
  },
};
