import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { ChatMessageType } from '@market-duck/types/chat';
import { SocketClient } from '@market-duck/utils/socketClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

enum ChatAction {
  SEND_ADDRESS = 'SEND_ADDRESS',
  SEND_ACCOUNT = 'SEND_ACCOUNT',
}

export const useChat = (currentRoomId: number) => {
  const [text, setText] = useState('');
  const [messageRoom, setMessageRoom] = useState<{ messages: ChatMessageModel[] }>({
    messages: [],
  });
  const userData = useRecoilValue(userDataAtom);

  const { data, fetchNextPage, isLoading, isFetchingNextPage, error } = useInfiniteQuery({
    queryKey: ['chat', currentRoomId],
    queryFn: () => {
      return {
        data: { sessionId: '', senderId: 0 },
      };
    },
    getNextPageParam: () => 0,
    initialPageParam: 0,
  });

  const client = useRef<SocketClient>(SocketClient.getInstance());

  // StompJS 인스턴스 생성 및 연결
  const connect = () => {
    client.current.connect();
  };

  const disconnect = () => {
    client.current.disconnect();
  };

  useEffect(() => {
    connect();

    // 컴포넌트 언마운트 시 연결 종료
    return () => disconnect();
  }, [currentRoomId]);

  const sessionId = data?.pages[0].data.sessionId;
  const senderId = data?.pages[0].data.senderId;

  if (!userData || !sessionId || !senderId) return;

  // 토픽 구독을 위한 함수
  const subscribe = (sessionId: string) => {
    client.current.subscribeToChat(sessionId, (msg) => {
      setMessageRoom((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
      }));
    });
  };

  // 메세지 발행을 위한 함수
  const sendMessage = (text: string, type: ChatMessageType) => {
    if (!client.current.isConnected()) {
      return;
    }

    client.current.sendMessage({
      chatRoomId: currentRoomId,
      senderId: userData.userId,
      content: text,
      sessionId: sessionId,
      messageType: type,
    });
    setText('');
  };

  const sendText = () => {
    sendMessage(text, 'TEXT');
    setText('');
  };

  const sendAction = (action: ChatAction) => {
    sendMessage(action, 'ACTION');
  };

  const sendImage = (url: string) => {
    // TODO: 이미지 업로드 API 호출하여 우선 처리 후 메세지 전송 필요
    sendMessage(url, 'IMAGE');
  };

  return {
    sendText,
    sendAction,
    disconnect,
    publish: sendMessage,
    messageRoom,
    setMessageRoom,
    text,
    setText,
    subscribe,
  };
};
