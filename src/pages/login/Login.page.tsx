import Logo from '@market-duck/assets/images/logo.svg?react';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Typo } from '@market-duck/components/Typo/Typo';
import LoginButton from '@market-duck/pages/login/components/LoginButton';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const Container = styled(AppGutter)`
  display: flex;
  height: calc(100dvh - 48px);
  flex-direction: column;
  justify-content: center;

  .logo {
    text-align: center;
    font-weight: 700;
  }

  .desc {
    text-align: center;
  }
`;

export const Login = () => {
  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="홈" />
      <Container>
        <Column gap="XL" justify="center">
          <Row justify="center" flex={0}>
            <Logo />
          </Row>
          <Column gap="M" flex={0}>
            <LoginButton provider="GOOGLE" />
            <LoginButton provider="KAKAO" />
            <LoginButton provider="APPLE" />
            <Typo tag="p" type="BODY_SM" className={`${AppSemanticColor.TEXT_TERTIARY.color} desc`}>
              로그인(회원가입)시 <span className={AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.color}>이용약관</span> 및{' '}
              <span className={AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.color}>개인정보 취급 방침</span>에 동의하는
              것으로 간주합니다.
            </Typo>
          </Column>
        </Column>
      </Container>
    </>
  );
};
