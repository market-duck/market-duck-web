import { Tab } from '@market-duck/components/Tab/Tab';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AppGutter } from '../AppGutter/AppGutter';

const meta = {
  title: 'UI Component/Tab', //* Document, Tree 구조가 됨
  component: Tab, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Test = () => {
  const [selectedTab, setselectedTab] = useState('test1');
  const tabList = [
    { id: 'test1', name: '테스트 탭1', value: 'test1' },
    { id: 'test2', name: '테스트 탭2', value: 'test2' },
  ];
  return (
    <AppGutter>
      <Tab selectedTab={selectedTab} setSelectedTab={setselectedTab} tabList={tabList} />
    </AppGutter>
  );
};
