import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { Meta, StoryObj } from '@storybook/react';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';

const meta = {
  title: 'UI Component/PageHeading', //* Document, Tree 구조가 됨
  component: PageHeading, //* 실제 작성한 컴포넌트
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PageHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small = () => {
  return (
    <AppGutter>
      <PageHeading title="제목 영역입니다" size="sm" rightComponent={<span>더보기</span>} />
    </AppGutter>
  );
};

export const Medium = () => {
  return (
    <AppGutter>
      <PageHeading title="제목 영역입니다" rightComponent={<span>더보기</span>} />
    </AppGutter>
  );
};
