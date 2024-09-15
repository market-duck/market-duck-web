import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';
import { MouseEvent } from 'react';
import { envManager } from '@market-duck/utils/env';
import { UserLoginProviderType } from '@market-duck/types/user';

const Container = styled(AppGutter)`
  display: flex;
  height: calc(100dvh - 48px);
  flex-direction: column;
  justify-content: center;
  .kakao {
    background-color: #fee500;
    color: #000;
  }
  .twitter {
    background-color: #000;
    color: #fff;
  }
  .logo {
    text-align: center;
    font-weight: 700;
  }
`;

export const Login = () => {
  const loginHandler = (e: MouseEvent) => {
    const id = e.currentTarget.id as UserLoginProviderType;
    // TODO: 추후 hostname에 맞는 oauth route로 redirectUri 변경 필요
    const redirectUri = 'http://localhost:5173/oauth';
    const providerApiId = envManager.getProviderKey(id);

    console.log(id, providerApiId);

    if (id === 'KAKAO') {
      location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${providerApiId}&redirect_uri=${redirectUri}&response_type=code`;
    } else if (id === 'GOOGLE') {
      location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${providerApiId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`;
    }
  };

  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="홈" />
      <Container>
        <Column gap="XL" justify="center" flex={1}>
          <Typo tag="p" type="HEADING_LG" className={`${AppColor.GREEN500.color} logo`}>
            마켓덕 로고
          </Typo>
          <Column gap="M" flex={0}>
            <Button id="GOOGLE" className="twitter" size="large" onClick={loginHandler}>
              구글 로그인
            </Button>
            <Button id="KAKAO" className="kakao" size="large" onClick={loginHandler}>
              카카오 로그인
            </Button>
          </Column>
        </Column>
      </Container>
    </>
  );
};
