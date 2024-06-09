import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Meta, StoryObj } from '@storybook/react';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';

const meta = {
  title: 'UI Component/NavigationTop', //* Document, Tree 구조가 됨
  component: NavigationTop, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof NavigationTop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NavigationTopMenu = () => {
  return (
    <AppGutter>
      <NavigationTop
        title="제목 영역입니다"
        onLeftClick={() => {
          alert('NavigationTop Left Click!');
        }}
        onRightClick={() => {
          alert('NavigationTop Right Click!');
        }}
      />
    </AppGutter>
  );
};
