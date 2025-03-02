import { Row } from '@market-duck/components/Flex/Flex';
import { Avatar } from '@market-duck/components/Image/Avatar';
import { Typo } from '@market-duck/components/Typo/Typo';
import { getFormattedDate } from '@market-duck/utils/date';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled(Row)<{ $isMine: boolean }>`
  align-self: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  .bubble {
    padding: ${AppSpcing.XXS} ${AppSpcing.XS};
    border-radius: ${AppRadii.M};
  }
`;

export const ChatMessage = ({ isMine = false }: { isMine?: boolean }) => {
  // ! mock으로 prop 사용 중, 실제 사용 시 prop 삭제하고 이 변수 사용+ 로직 작성
  // const isMine = false;

  const time = getFormattedDate(new Date(), 'A hh:mm');
  const bubbleColor = isMine ? AppSemanticColor.BG_INTERACTIVE_PRIMARY.bg : AppSemanticColor.BG_SECONDARY.bg;
  const textColor = isMine ? AppSemanticColor.TEXT_INVERSE.color : AppSemanticColor.TEXT_SECONDARY.color;
  return (
    <Container alignItems="center" $isMine={isMine} gap="XS" flex={0}>
      {!isMine && <Avatar size="sm" />}
      <Row gap="XXS" alignItems="end" reverse={isMine}>
        <div className={`bubble ${bubbleColor}`}>
          <Typo tag="span" type="BODY_MD" weight={500} className={textColor}>
            {'message'}
          </Typo>
        </div>
        <Typo tag="span" type="CAPTION_SM" weight={500} className={AppSemanticColor.TEXT_TERTIARY.color}>
          {time}
        </Typo>
      </Row>
    </Container>
  );
};
