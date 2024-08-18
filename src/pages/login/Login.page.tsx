import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

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
  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="홈" />
      <Container>
        <Column gap="XL" justify="center" flex={1}>
          <Typo tag="p" type="HEADING_LG" className={`${AppColor.GREEN500.color} logo`}>
            마켓덕 로고
          </Typo>
          <Column gap="M" flex={0}>
            <Button className="kakao" size="large">
              카카오 로그인
            </Button>
            <Button className="twitter" size="large">
              X 로그인
            </Button>
          </Column>
        </Column>
      </Container>
    </>
  );
};
