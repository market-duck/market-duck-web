import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled(AppGutter)`
  min-height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${AppSpcing.XL};
  flex: 0;
`;

export const Welcome = ({ onNext }: { onNext: () => void }) => {
  return (
    <Container>
      <Typo tag="p" type="HEADING_LG" weight={600} color={AppSemanticColor.TEXT_PRIMARY.color} align="center">
        가입을 환영합니다!
      </Typo>
      <Button onClick={onNext}>홈으로 이동</Button>
    </Container>
  );
};
