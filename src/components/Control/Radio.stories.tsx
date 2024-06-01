import { Radio } from '@market-duck/components/Control/Radio';
import { Column } from '@market-duck/components/Flex/Flex';
import { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Component/Radio', //* Document, Tree 구조가 됨
  component: Radio, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(() => {
      alert('Click Action!');
    }),
  },
} satisfies Meta<typeof Radio>;

export default meta;

export const Small = () => {
  return (
    <Column gap="S">
      <Radio $size="s" checked={false}>
        텍스트가 들어가는 영역입니다
      </Radio>
      <Radio $size="s" checked={true}>
        텍스트가 들어가는 영역입니다
      </Radio>
    </Column>
  );
};

export const Middle = () => {
  return (
    <Column gap="S">
      <Radio $size="m" checked={false}>
        텍스트가 들어가는 영역입니다
      </Radio>
      <Radio $size="m" checked={true}>
        텍스트가 들어가는 영역입니다
      </Radio>
    </Column>
  );
};
