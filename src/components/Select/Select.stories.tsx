import { Select } from '@market-duck/components/Select/Select';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

export default {
  title: 'UI Component/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

const Template: StoryFn<{
  label?: string;
  selectType: 'single' | 'multi';
  onCustomOpen?: () => void;
  placeholder?: string;
  optionList?: Array<{ label: string; value: string }>;
  isDisabled?: boolean;
  isError?: boolean;
}> = (args) => {
  const [value, setValue] = useState<Array<{ label: string; value: string }>>([]);

  return <Select {...args} value={value} onChangeValue={setValue} />;
};

export const Single = Template.bind({});
Single.args = {
  label: 'single select label',
  selectType: 'single',
  placeholder: 'Enter text...',
  isDisabled: false,
  isError: false,
  optionList: [
    { label: 'test1', value: 'test1' },
    { label: 'test2', value: 'test2' },
    { label: 'test3', value: 'test3' },
  ],
};

export const Multi = Template.bind({});
Multi.args = {
  label: 'multi select label',
  selectType: 'multi',
  placeholder: 'Enter text...',
  isDisabled: false,
  isError: false,
  optionList: [
    { label: 'test1', value: 'test1' },
    { label: 'test2', value: 'test2' },
    { label: 'test3', value: 'test3' },
  ],
};
