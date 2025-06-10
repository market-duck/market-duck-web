import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Chat } from '@market-duck/components/Chat/Chat';
import { ChatHeader } from '@market-duck/components/Chat/ChatHeader';
import { SendMessage } from '@market-duck/components/Chat/SendMessage';
import { DropDownMenu } from '@market-duck/components/DropDownMenu/DropDownMenu';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useChat } from '@market-duck/hooks/useChat';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

export const ChatRoom = () => {
  const userData = useRecoilValue(userDataAtom);
  const {
    state: { roomId },
  } = useLocation();
  const navigate = useNavigate();

  const { connect, disconnect, sendMessage, chatRoomData, messageRoom, setMessageRoom, text, setText, subscribe } =
    useChat(roomId);

  useEffect(() => {
    if (!userData) {
      // return navigate('/login');
    }
  }, []);

  // userData 또는 chatRoomData가 없으면 로딩 상태로 간주
  if (!userData || !chatRoomData) {
    return <div>Loading...</div>; // 혹은 Skeleton 컴포넌트 등으로 대체
  }

  const dropdownItems = [
    {
      id: 'leave',
      name: '나가기',
      handler: () => {
        disconnect();
      },
    },
    { id: 'report', name: '신고하기', handler: () => {} },
    { id: 'block', name: '차단하기', handler: () => {} },
  ];

  return (
    <Container>
      <NavigationTop
        leftButtonIconType="back"
        title={'nickname'}
        rightButton={<DropDownMenu items={dropdownItems} isDotMenu isTransparent />}
        onLeftClick={() => {
          disconnect();
          navigate(-1);
        }}
      />
      <ChatHeader thumbnailUrl={chatRoomData.feedImageUrl} feedTitle={chatRoomData.feedTitle} price={0} />
      <AppGutter $padding="0 1rem">
        <Chat messageList={messageRoom.messages} userId={userData.userId} />
      </AppGutter>
      <SendMessage sendMessage={sendMessage} />
    </Container>
  );
};
