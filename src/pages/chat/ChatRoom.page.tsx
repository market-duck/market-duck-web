import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Chat } from '@market-duck/components/Chat/Chat';
import { ChatHeader } from '@market-duck/components/Chat/ChatHeader';
import { SendMessage } from '@market-duck/components/Chat/SendMessage';
import { DropDownMenu } from '@market-duck/components/DropDownMenu/DropDownMenu';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useChat } from '@market-duck/hooks/useChat';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  // const {
  //   sendText,
  //   sendAction,
  //   disconnect,
  //   publish: sendMessage,
  //   messageRoom,
  //   setMessageRoom,
  //   text,
  //   setText,
  //   subscribe,
  // } = useChat(roomId);

  useEffect(() => {
    console.log(roomId);
    if (!userData) {
      // return navigate('/login');
    }
  }, []);

  // if (!userData) return null;

  const dropdownItems = [
    {
      id: 'leave',
      name: '나가기',
      handler: () => {},
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
      />
      sendText
      <ChatHeader />
      <AppGutter>
        <Chat />
      </AppGutter>
      {/* <SendMessage sendText={sendText} /> */}
    </Container>
  );
};
