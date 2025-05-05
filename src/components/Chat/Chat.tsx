import { ChatMessage } from '@market-duck/components/Chat/ChatMessage';
import { Typo } from '@market-duck/components/Typo/Typo';
import { getFormattedDate } from '@market-duck/utils/date';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${AppSpcing.L};
  justify-content: flex-end;
  min-height: 100dvh;
  padding-top: ${AppSpcing.M};
`;

export const Chat = () => {
  return (
    <Container ref={(node) => node?.scrollTo(0, node.offsetHeight)}>
      <Typo tag="p" type="CAPTION_MD" weight={500} className={AppSemanticColor.TEXT_SECONDARY.color} align="center">
        {getFormattedDate(new Date(), 'YYYY년 M월 D일')}
      </Typo>
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
      <ChatMessage />
      <ChatMessage isMine />
    </Container>
  );
};
