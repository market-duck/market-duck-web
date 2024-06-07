import { Button } from '@market-duck/components/Button/Button';
import { BottomSheet, BottomSheetHandle } from '@market-duck/components/Dialog/BottomSheet';
import { Dialog, DialogHandle } from '@market-duck/components/Dialog/Dialog';

import { Meta } from '@storybook/react';
import { useRef } from 'react';
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
  const dialogRef = useRef<BottomSheetHandle>(null);

  const handleClick = () => {
    if (dialogRef.current) {
      dialogRef.current.open();
    }
  };

  return (
    <>
      <Button onClick={handleClick}>Open Dialog</Button>
      <BottomSheet title="타이틀" desc="내용" ref={dialogRef} />
    </>
  );
};

export default meta;
