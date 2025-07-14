import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { ChatMessage } from '@market-duck/components/Chat/ChatMessage';
import { Typo } from '@market-duck/components/Typo/Typo';
import { getFormattedDate } from '@market-duck/utils/date';
import { useEffect, useRef } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${AppSpcing.L};
  justify-content: flex-start;
  min-height: 100%;
  padding-top: ${AppSpcing.M};
`;

export const Chat = ({
  messageList,
  userId,
  shouldAutoScroll,
}: {
  messageList: ChatMessageModel[];
  userId: Number;
  shouldAutoScroll: boolean;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldAutoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [messageList.length, shouldAutoScroll]);

  return (
    <Container ref={(node) => node?.scrollTo(0, node.offsetHeight)}>
      <Typo tag="p" type="CAPTION_MD" weight={500} className={AppSemanticColor.TEXT_SECONDARY.color} align="center">
        {getFormattedDate(new Date(), 'YYYY년 M월 D일')}
      </Typo>
      {messageList.map((item) => {
        return (
          <ChatMessage
            key={item.messageId}
            isMine={item.senderId === userId}
            type={item.messageType}
            content={item.content}
          />
        );
      })}
      <div ref={bottomRef} />
    </Container>
  );
};
