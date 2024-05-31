import { Button } from '@market-duck/components/Button/Button';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Component/Button', //* Document, Tree 구조가 됨
  component: Button, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(() => {
      alert('Click Action!');
    }),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'primary button',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'secondary button',
    disabled: false,
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'small',
    children: 'text button',
    disabled: false,
  },
};

export const WithIcon = () => {
  return (
    <div>
      <Button
        onClick={() => alert('Click Action!')}
        variant="primary"
        size="large"
        leftIcon="PlusIcon"
        rightIcon="PlusIcon"
      >
        With Icon
      </Button>
    </div>
  );
};
