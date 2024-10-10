import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';
import { SelectInterestTag } from '@market-duck/pages/onboard/components/SelectInterestTag';
import { MouseEventHandler } from 'react';

const Container = styled(AppGutter)`
  height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Onboard = () => {
  const submitHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log('on boarding submit');
  };

  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="온보딩" />
      <Container>
        <Column gap="XL" flex={0}>
          <Column gap="M" flex={0}>
            <PageHeading title="홈 화면 구성하기" />
            <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_SECONDARY.color}>
              태그를 선택해 관심사 기반으로 홈 화면을 구성해요.
            </Typo>
          </Column>
          <SelectInterestTag />
        </Column>
        <Column gap="XS" flex={0}>
          <Button onClick={submitHandler}>회원가입 완료</Button>
          <Button onClick={submitHandler} variant="text">
            건너뛰기
          </Button>
        </Column>
      </Container>
    </>
  );
};
