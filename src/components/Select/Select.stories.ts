import { Select } from '@market-duck/components/Select/Select';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'UI Component/Select', //* Document, Tree 구조가 됨
  component: Select, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChangeValue: fn((v) => console.log(v)) },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleSelect: Story = {
  args: {
    selectType: 'single',
    value: [0, 1, 2],
    label: 'test',
    optionList: [
      { label: 'test1', value: 'test1' },
      { label: 'test2', value: 'test2' },
      { label: 'test3', value: 'test3' },
    ],
  },
};

export const MultiSelect: Story = {
  args: {
    selectType: 'multi',
    value: [0, 1, 2],
    label: 'test',
    optionList: [
      { label: 'test1', value: 'test1' },
      { label: 'test2', value: 'test2' },
      { label: 'test3', value: 'test3' },
    ],
  },
};
