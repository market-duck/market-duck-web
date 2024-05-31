import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { TextArea } from '@market-duck/components/Form/TextArea'; // 실제 TextArea 컴포넌트를 임포트

export default {
  title: 'UI Component/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

const Template: StoryFn<{
  value: string;
  placeholder?: string;
  maxLength?: number;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  caption?: string;
}> = (args) => {
  const [value, setValue] = useState(args.value);

  return <TextArea {...args} value={value} changeHandler={(event) => setValue(event.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  placeholder: 'Enter text...',
  maxLength: 500,
  isDisabled: false,
  isError: false,
  label: 'Label',
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
