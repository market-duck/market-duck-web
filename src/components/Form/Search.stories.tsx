import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { Search } from '@market-duck/components/Form/Search';

export default {
  title: 'UI Component/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Search>;

const Template: StoryFn<{
  placeholder?: string;
  isDisabled?: boolean;
  isError?: boolean;
}> = (args) => {
  const [sarchValue, setSearchValue] = useState('');

  return (
    <Search
      {...args}
      value={sarchValue}
      changeHandler={(event) => setSearchValue(event.target.value)}
      deleteHandler={() => {
        setSearchValue('');
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
  isDisabled: false,
  isError: false,
};
