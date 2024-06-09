import { Badge } from '@market-duck/components/Badge/Badge';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Component/Badge', //* Document, Tree 구조가 됨
  component: Badge, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { size: 'lg', variant: 'primary', children: 'primary' },
};
export const Danger: Story = {
  args: { size: 'lg', variant: 'danger', children: 'danger' },
};
export const Info: Story = {
  args: { size: 'lg', variant: 'info', children: 'info' },
};
