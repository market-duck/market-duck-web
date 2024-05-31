import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import { Input } from './Input'; // 실제 Input 컴포넌트를 임포트

export default {
  title: 'UI Component/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

const Template: StoryFn<{
  value: string;
  placeholder?: string;
  maxLength?: number;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  caption?: string;
}> = (args) => {
  const [value, setValue] = useState(args.value);

  return <Input {...args} value={value} changeHandler={(event) => setValue(event.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  placeholder: 'Enter text...',
  maxLength: 100,
  isDisabled: false,
  isError: false,
  label: 'Label',
  prefix: null,
  suffix: null,
  caption: 'Caption text',
};

export const isLabelTrue: StoryFn<typeof Template> = Template.bind({});
isLabelTrue.args = {
  value: '',
  label: 'test',
};

export const isLabelFalse: StoryFn<typeof Template> = Template.bind({});
isLabelFalse.args = {
  value: '',
};
