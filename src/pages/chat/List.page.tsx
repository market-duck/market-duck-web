import { chatAPI } from '@market-duck/apis/chatAPI';
import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import NotFoundImage from '@market-duck/assets/images/notFound.svg?react';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Typo } from '@market-duck/components/Typo/Typo';
import { ChatMessageTypeEnum } from '@market-duck/types/chat';
import { getTimeDiff } from '@market-duck/utils/date';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';
import { ChatListItem } from './components/ChatListItem';

const Wrap = styled(AppGutter)`
  position: relative;
  display: flex;
  flex-direction: column;

  &.empty {
    height: 100dvh;
    justify-content: center;
    align-items: center;
    gap: ${AppSpacing.XXXL};
  }
`;

export const ChatList = () => {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const { data: chatRooms } = useQuery({
    queryKey: ['chat', 'rooms'],
    queryFn: () => chatAPI.getChatRooms(),
  });
  const getLastMessageText = (lastMessage: ChatMessageModel) => {
    switch (lastMessage.messageType) {
      case ChatMessageTypeEnum.IMAGE:
        return '[이미지]';
      case ChatMessageTypeEnum.SYSTEM:
        return lastMessage.content;
      case ChatMessageTypeEnum.TEXT:
        return lastMessage.content;
    }

    return '';
  };

  useEffect(() => {
    if (!userData) {
      return navigate('/login');
    }
  }, []);

  if (!userData) return null;

  return (
    <>
      <NavigationTop leftButtonIconType="back" title="채팅 목록" onLeftClick={() => navigate('/')} />
      {chatRooms && chatRooms.length ? (
        <Wrap>
          {chatRooms?.map((room) => {
            return (
              <ChatListItem
                key={room.chatRoomId}
                imgUrl={room.receiver.profileImageUrl}
                id={room.chatRoomId}
                name={room.receiver.nickname}
                lastMessage={getLastMessageText(room.recentMessages[room.recentMessages.length - 1])}
                noReadCount={room.unreadCount}
                lastViewDate={getTimeDiff(room.recentMessages[room.recentMessages.length - 1].createdAt)}
              />
            );
          })}
        </Wrap>
      ) : (
        <Wrap className="empty">
          <NotFoundImage />
          <Typo tag="p" align="center" type="BODY_MD" weight={500} className={AppSemanticColor.TEXT_PRIMARY.color}>
            현재 참여중인 채팅이 없습니다.
          </Typo>
        </Wrap>
      )}
    </>
  );
};
