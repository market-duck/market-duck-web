import { AlertList } from '@market-duck/pages/alert/components/AlertList';
import { TextButton } from '@market-duck/components/Button/TextButton';
import { Row, alignItemsCenter, justifyEnd } from '@market-duck/components/Flex/Flex';

export const Alert = () => {
  return (
    <div>
      <Row justify={justifyEnd} alignItems={alignItemsCenter} gap="XS">
        <TextButton variant="primary">모두 읽기</TextButton>
        <TextButton variant="primary">알림 삭제</TextButton>
      </Row>
    </div>
  );
};
