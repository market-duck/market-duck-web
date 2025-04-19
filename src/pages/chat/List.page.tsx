import { chatAPI } from '@market-duck/apis/chatAPI';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { getTimeDiff } from '@market-duck/utils/date';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChatListItem } from './components/ChatListItem';

const Wrap = styled(AppGutter)`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const dummy = [
  {
    id: 1,
    imgUrl:
      'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
    name: '닉네임',
    lastMessage: '마지막 보낸 메시지 미리보기',
    lastViewDate: '2025-02-28',
    noReadCount: 3,
  },
  {
    id: 2,
    imgUrl:
      'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
    name: '닉네임',
    lastMessage: '마지막 보낸 메시지 미리보기',
    lastViewDate: '2025-02-28',
    noReadCount: 0,
  },
  {
    id: 3,
    imgUrl:
      'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
    name: '닉네임',
    lastMessage: '마지막 보낸 메시지 미리보기',
    lastViewDate: '2025-02-28',
    noReadCount: 0,
  },
];

export const ChatList = () => {
  const navigate = useNavigate();
  const { data: chatRooms } = useQuery({
    queryKey: ['chat', 'rooms'],
    queryFn: () => chatAPI.getChatRooms(),
  });
  return (
    <>
      <NavigationTop leftButtonIconType="back" title="채팅 목록" onLeftClick={() => navigate('/')} />
      <Wrap>
        {chatRooms?.map((room) => {
          return (
            <ChatListItem
              key={room.chatRoomId}
              imgUrl={room.receiver.profileImageUrl}
              id={room.chatRoomId}
              name={room.receiver.nickname}
              lastMessage={room.recentMessages[room.recentMessages.length - 1].content}
              noReadCount={room.unreadCount}
              lastViewDate={getTimeDiff(room.recentMessages[room.recentMessages.length - 1].createdAt)}
            />
          );
        })}
      </Wrap>
    </>
  );
};
