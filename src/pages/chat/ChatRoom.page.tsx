import { chatAPI } from '@market-duck/apis/chatAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Chat } from '@market-duck/components/Chat/Chat';
import { ChatHeader } from '@market-duck/components/Chat/ChatHeader';
import { SendMessage } from '@market-duck/components/Chat/SendMessage';
import { DropDownMenu } from '@market-duck/components/DropDownMenu/DropDownMenu';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useChat } from '@market-duck/hooks/useChat';
import { useDialog } from '@market-duck/hooks/useDialog';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ScrollSentinel } from './components/DetectIntersection';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh; // 필수: 전체 뷰 높이 설정
`;

const ScrollArea = styled(AppGutter)`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
`;

export const ChatRoom = () => {
  const userData = useRecoilValue(userDataAtom);
  const {
    state: { roomId },
  } = useLocation();
  const navigate = useNavigate();
  const { confirm, alert } = useDialog();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mutateAsync: leaveChatRoom } = useMutation({
    mutationKey: ['feed', 'create'],
    mutationFn: async ({ roomId }: { roomId: number }) => {
      return await chatAPI.leaveChatRoom({ roomId });
    },
    onSuccess: () => {
      navigate(-1);
    },
    onError: (err) => {
      alert({ title: '오류', desc: '오류가 발생하였습니다.\n다시 시도해주세요.' });
    },
  });

  const {
    connect,
    disconnect,
    sendMessage,
    chatRoomData,
    messages,
    setMessages,
    text,
    setText,
    subscribe,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
    shouldAutoScroll,
  } = useChat(roomId, scrollRef);

  useEffect(() => {
    if (!userData) {
      // return navigate('/login');
    }
  }, []);

  const dropdownItems = chatRoomData
    ? [
        {
          id: 'leave',
          name: '나가기',
          handler: async () => {
            const result = await confirm({
              title: '정말 나가시겠습니까?',
              desc: '나가신 뒤 알림에 유의해 주세요.',
              positiveBtnText: '나가기',
              positiveBtnVariant: 'danger',
            });
            if (result) {
              disconnect();
              leaveChatRoom({ roomId: chatRoomData.chatRoom.chatRoomId });
            }
          },
        },
        {
          id: 'report',
          name: '신고하기',
          handler: async () => {
            const result = await confirm({
              title: `${chatRoomData.chatRoom.receiver.nickname} 님을 신고하시겠습니까?`,
              desc: '신고내용은 일주일 내에 접수되며\n관련 내용은 알림으로 전달드립니다.',
              positiveBtnText: '신고하기',
              positiveBtnVariant: 'danger',
            });

            if (result) {
              //TODO::신고 API 호출
              console.log('신고!!!!!');
              disconnect();
              navigate(-1);
            }
          },
        },
        {
          id: 'block',
          name: '차단하기',
          handler: async () => {
            const result = await confirm({
              title: `${chatRoomData.chatRoom.receiver.nickname} 님을 차단하시겠습니까?`,
              desc: '차단한 회원의 모든 게시물이 보이지 않게 됩니다.',
              positiveBtnText: '차단하기',
              positiveBtnVariant: 'danger',
            });

            if (result) {
              //TODO::신고 API 호출
              console.log('차단!!!!!');
              disconnect();
              navigate(-1);
            }
          },
        },
      ]
    : [];

  useEffect(() => {
    // html, body 스크롤 막기
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';

    return () => {
      // 컴포넌트 unmount 시 원래대로 복구
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
    };
  }, []);

  // userData 또는 chatRoomData가 없으면 로딩 상태로 간주
  if (!userData || !chatRoomData) {
    return <div>Loading...</div>; // 혹은 Skeleton 컴포넌트 등으로 대체
  }

  return (
    <Container>
      <NavigationTop
        leftButtonIconType="back"
        title={chatRoomData.chatRoom.receiver.nickname}
        rightButton={<DropDownMenu items={dropdownItems} isDotMenu isTransparent />}
        onLeftClick={() => {
          disconnect();
          navigate(-1);
        }}
      />
      <ChatHeader
        thumbnailUrl={chatRoomData.chatRoom.feedImageUrl}
        feedTitle={chatRoomData.chatRoom.feedTitle}
        price={0}
      />
      <ScrollArea $padding="0 1rem" ref={scrollRef}>
        {hasNextPage && (
          <ScrollSentinel
            onIntersect={() => {
              if (!isFetchingNextPage) handleLoadMore();
            }}
            enabled={hasNextPage}
          />
        )}
        <Chat shouldAutoScroll={shouldAutoScroll} messageList={messages.messages} userId={userData.userId} />
      </ScrollArea>
      <SendMessage
        sendAction={(type, text, imageFiles) => {
          console.log({ text, type, imageFiles });
          sendMessage({ type, text, imageFiles });
        }}
      />
    </Container>
  );
};
