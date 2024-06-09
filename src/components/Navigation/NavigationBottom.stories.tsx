import { NavigationBottom } from '@market-duck/components/Navigation/NavigationBottom';
import { Meta, StoryObj } from '@storybook/react';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';

const meta = {
  title: 'UI Component/NavigationBottom', //* Document, Tree 구조가 됨
  component: NavigationBottom, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof NavigationBottom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NavigationBottomMenu = () => {
  return (
    <AppGutter>
      <NavigationBottom />
    </AppGutter>
  );
};
