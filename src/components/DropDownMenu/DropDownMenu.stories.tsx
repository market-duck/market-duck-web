import { Meta, StoryFn } from '@storybook/react';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { DropDownMenu } from './DropDownMenu'; // 실제 Input 컴포넌트를 임포트

export default {
  title: 'UI Component/DropDownMenu',
  component: DropDownMenu,
  decorators: [
    (Story) => (
      <div
        style={{ width: '100%', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof DropDownMenu>;

interface MenuItemType {
  id: string;
  name: string;
  handler: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Template: StoryFn<{
  items: MenuItemType[];
  isDotMenu?: boolean;
  selectedIndex?: number;
  setSelectedIndex?: Dispatch<SetStateAction<number>>;
}> = (args) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return <DropDownMenu {...args} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />;
};

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      name: '거래중',
      id: 'inProgress',
      handler: () => console.log('inProgress'),
    },
    {
      name: '거래완료',
      id: 'completed',
      handler: () => console.log('completed'),
    },
    {
      name: '거래가능',
      id: 'available',
      handler: () => console.log('available'),
    },
  ],
  isDotMenu: false,
  selectedIndex: 0,
};

export const isDotTrue: StoryFn<typeof Template> = Template.bind({});
isDotTrue.args = {
  items: [
    {
      name: '거래중',
      id: 'inProgress',
      handler: () => console.log('inProgress'),
    },
    {
      name: '거래완료',
      id: 'completed',
      handler: () => console.log('completed'),
    },
    {
      name: '거래가능',
      id: 'available',
      handler: () => console.log('available'),
    },
  ],
  isDotMenu: true,
  selectedIndex: undefined,
  setSelectedIndex: undefined,
};
