import { Avatar } from '@market-duck/components/Image/Avatar';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Component/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    imgSrc:
      'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
  },
};
