import { Button } from '@market-duck/components/Button/Button';
import { Dialog } from '@market-duck/components/Dialog/Dialog';
import { useDialog } from '@market-duck/hooks/useDialog';
import { Meta } from '@storybook/react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

const meta = {
  title: 'UI Component/Dialog', //* Document, Tree 구조가 됨
  component: Dialog, //* 실제 작성한 컴포넌트
  parameters: {
    docs: {
      story: {
        height: '300px',
        backgroundColor: AppSemanticColor.BG_SECONDARY.hex,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export const Default = () => {
  const { alert } = useDialog();

  const handleClick = () => {
    alert({ title: '타이틀', desc: '내용' });
  };

  return (
    <>
      <Button onClick={handleClick}>Open Dialog</Button>
    </>
  );
};

export default meta;
