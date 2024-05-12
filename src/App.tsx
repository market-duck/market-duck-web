import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { alignItemsStretch, justifyEvenly, Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppColor, AppColorStyle } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Test = styled.div`
  background-color: ${AppColor.BLUE700.hex};
  padding: ${AppSpcing.XXL};
  border-radius: ${AppRadii.PILL};
`;

function App() {
  return (
    <>
      <AppColorStyle />
      {/* TODO:: Router */}
      {/* 아래는 테스트 입니다. */}
      <AppGutter>
        <Button variant="secondary" size="large">
          test
        </Button>
        <Row justify={justifyEvenly} gap="XXL" flex="auto" alignItems={alignItemsStretch}>
          <Test className={AppColor.YELLOW700.bg}>
            <Typo type="BODY_LG" className={AppColor.GREEN300.color}>
              타 도 회 사
            </Typo>
          </Test>
          <Test>
            <Typo type="HEADING_LG" className={AppColor.WHITE.color}>
              마 켓 덕 짱
            </Typo>
          </Test>
          <Test>
            <Typo type="CAPTION_MD" className={AppColor.WHITE.color}>
              월 급 조 아
            </Typo>
          </Test>
        </Row>
      </AppGutter>
    </>
  );
}

export default App;
