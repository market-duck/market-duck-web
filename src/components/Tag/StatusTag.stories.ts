import { StatusTag } from '@market-duck/components/Tag/StatusTag';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Component/StatusTag',
  component: StatusTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof StatusTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    color: 'neutral',
    text: 'neutral',
  },
};

export const Green: Story = {
  args: {
    color: 'green',
    text: 'green',
  },
};

export const Red: Story = {
  args: {
    color: 'red',
    text: 'red',
  },
};

export const Blue: Story = {
  args: {
    color: 'blue',
    text: 'blue',
  },
};

export const Yellow: Story = {
  args: {
    color: 'yellow',
    text: 'yellow',
  },
};
