import { Checkbox } from '@market-duck/components/Control/Checkbox';
import { Column } from '@market-duck/components/Flex/Flex';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Component/Checkbox', //* Document, Tree 구조가 됨
  component: Checkbox, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(() => {
      alert('Click Action!');
    }),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = () => {
  return (
    <Column gap="S">
      <Checkbox $size="s" checked={false}>
        텍스트가 들어가는 영역입니다
      </Checkbox>
      <Checkbox $size="s" checked={true}>
        텍스트가 들어가는 영역입니다
      </Checkbox>
    </Column>
  );
};

export const Middle = () => {
  return (
    <Column gap="S">
      <Checkbox $size="m" checked={false}>
        텍스트가 들어가는 영역입니다
      </Checkbox>
      <Checkbox $size="m" checked={true}>
        텍스트가 들어가는 영역입니다
      </Checkbox>
    </Column>
  );
};
