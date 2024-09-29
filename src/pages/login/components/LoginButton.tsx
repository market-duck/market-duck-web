import Apple from '@market-duck/assets/icons/apple.svg?react';
import Google from '@market-duck/assets/icons/google.svg?react';
import Kakao from '@market-duck/assets/icons/kakao.svg?react';
import { Button } from '@market-duck/components/Button/Button';
import { Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { UserLoginProviderType } from '@market-duck/types/user';
import { envManager } from '@market-duck/utils/env';
import { MouseEventHandler } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  &.google {
    border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
    background-color: #fff;
    color: #0d0d0d;
  }
  &.kakao {
    background-color: #fee500;
    color: #000;
  }
  &.apple {
    background-color: #000;
    color: #fff;
  }
  .text {
    flex: 1;
    text-align: center;
  }
`;

const LoginButton = ({ provider }: { provider: UserLoginProviderType }) => {
  const loginHandler: MouseEventHandler = (e) => {
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

  const createProviderElement = () => {
    switch (provider) {
      case 'GOOGLE':
        return { text: '구글', Icon: Google };
      case 'KAKAO':
        return { text: '카카오', Icon: Kakao };
      case 'APPLE':
        return { text: 'Apple', Icon: Apple };
    }
  };

  const { text, Icon } = createProviderElement();

  return (
    <StyledButton id={provider} className={provider.toLowerCase()} size="large" onClick={loginHandler}>
      <Row gap="XS" alignItems="center">
        <Icon width={24} />
        <Typo className="text" tag="span" type="BODY_LG">
          {text}로 로그인
        </Typo>
      </Row>
    </StyledButton>
  );
};

export default LoginButton;
