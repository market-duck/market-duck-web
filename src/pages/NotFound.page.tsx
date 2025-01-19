import NotFoundImage from '@market-duck/assets/images/notFound.svg?react';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled(AppGutter)`
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Column gap="M" alignItems="center">
        <NotFoundImage />
        <Typo tag="h1" align="center" type="HEADING_MD">
          잘못 된 접근입니다.
        </Typo>
        <Button onClick={() => navigate('/')}>홈으로</Button>
      </Column>
    </Container>
  );
};
