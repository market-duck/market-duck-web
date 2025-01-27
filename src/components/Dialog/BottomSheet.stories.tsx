import { Button } from '@market-duck/components/Button/Button';
import { BottomSheet } from '@market-duck/components/Dialog/BottomSheet';
import { useDialog } from '@market-duck/hooks/useDialog';
import { Meta } from '@storybook/react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

const meta = {
  title: 'UI Component/BottomSheet', //* Document, Tree 구조가 됨
  component: BottomSheet, //* 실제 작성한 컴포넌트
  parameters: {
    docs: {
      story: {
        height: '300px',
        backgroundColor: AppSemanticColor.BG_SECONDARY.hex,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomSheet>;

export const Default = () => {
  const { bottomSheet } = useDialog();

  const handleClick = () => {
    bottomSheet({ title: '타이틀', desc: '내용' });
  };

  return (
    <>
      <Button onClick={handleClick}>Open Dialog</Button>
    </>
  );
};

export default meta;
