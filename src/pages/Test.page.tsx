import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';

export const TestPage = () => {
  return (
    <AppGutter>
      <Row>
        <Button>버튼 입니다 버튼이에요</Button>
      </Row>
      <Column>
        <p>여기는 p태그 입니다</p>
      </Column>
    </AppGutter>
  );
};
