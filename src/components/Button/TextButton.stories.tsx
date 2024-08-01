import { TextButton } from '@market-duck/components/Button/TextButton';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Component/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(() => {
      alert('TextButton Click Action!');
    }),
  },
} satisfies Meta<typeof TextButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'primary button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'secondary button',
  },
};

export const WithIcon = () => {
  return (
    <div>
      <TextButton onClick={() => alert('Click Action!')} variant="primary" leftIcon="PlusIcon" rightIcon="PlusIcon">
        With Icon
      </TextButton>
    </div>
  );
};
