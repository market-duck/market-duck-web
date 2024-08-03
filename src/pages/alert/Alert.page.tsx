import { AlertList } from '@market-duck/pages/alert/components/AlertList';
import { TextButton } from '@market-duck/components/Button/TextButton';
import { Row } from '@market-duck/components/Flex/Flex';

export const Alert = () => {
  const dummyData = [
    {
      id: '01',
      type: 'feed',
      count: 1,
      keyword: '하이큐',
      time: '0분전',
    },
    {
      id: '02',
      type: 'chat',
      count: 1,
      keyword: '하이큐 굿즈 구매',
      time: '2024.02.22 (월)',
    },
  ];

  return (
    <div>
      <Row justify={'end'} alignItems={'center'} gap="XS">
        <TextButton variant="primary">모두 읽기</TextButton>
        <TextButton variant="primary">알림 삭제</TextButton>
      </Row>
      <AlertList alertList={dummyData} />
    </div>
  );
};
