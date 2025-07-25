import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Row } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useDialog } from '@market-duck/hooks/useDialog';
import { AlertList } from '@market-duck/pages/alert/components/AlertList';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const AlertWrap = styled(AppGutter)`
  display: flex;
  height: calc(100vh - 48px);
  flex-direction: column;
  gap: ${AppSpacing.M};
  padding-top: ${AppSpacing.M};
`;

const dummyData = [
  {
    id: '01',
    type: 'feed',
    isRead: false,
    keyword: '하이큐',
    time: '0분전',
  },
  {
    id: '02',
    type: 'chat',
    isRead: true,
    keyword: '하이큐 굿즈 구매',
    time: '2024.02.22 (월)',
  },
];

export const Alert = () => {
  const { confirm } = useDialog();

  const handleAllRead = () => {
    console.log('allRead');
  };

  const handleAllDelete = async () => {
    try {
      const result = await confirm({
        title: '모든 알림을 삭제할까요?',
        desc: '삭제한 알림은 복구할 수 없습니다.',
        positiveBtnText: '삭제',
        positiveBtnVariant: 'danger',
      });
      if (result) {
        console.log('delete');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavigationTop leftButtonIconType="back" title="알림" rightButton={<></>} />
      <AlertWrap>
        <Row justify="end" alignItems="center" gap="XS">
          <Button variant="secondary" size="small" onClick={handleAllRead}>
            모두 읽기
          </Button>
          <Button variant="secondary" size="small" onClick={handleAllDelete}>
            전체 삭제
          </Button>
        </Row>
        <AlertList alertList={dummyData} />
      </AlertWrap>
    </>
  );
};
