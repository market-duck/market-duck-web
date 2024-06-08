import { Toggle } from '@market-duck/components/Control/Toggle';
import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Component/Toggle', //* Document, Tree 구조가 됨
  component: Toggle, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(() => {
      alert('Click Action!');
    }),
  },
} satisfies Meta<typeof Toggle>;

export default meta;

export const Small = () => {
  return (
    <div>
      <Toggle $size={16} />
    </div>
  );
};

export const Middle = () => {
  return (
    <div>
      <Toggle $size={20} />
    </div>
  );
};
