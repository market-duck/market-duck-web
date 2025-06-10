import { chatSocketClient } from '../utils/socketClient';
import { chatAPI } from './../apis/chatAPI';
import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { ChatMessageType } from '@market-duck/types/chat';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

enum ChatAction {
  SEND_ADDRESS = 'SEND_ADDRESS',
  SEND_ACCOUNT = 'SEND_ACCOUNT',
}

//TODO:: 메시지 수신, 메시지 발송 시에 제대로 db에 저장이 안 되는 거 같은데 API 요청하는 거 체크해야 할듯

export const useChat = (currentRoomId: number) => {
  const [text, setText] = useState('');
  const [messageRoom, setMessageRoom] = useState<{ messages: ChatMessageModel[] }>({
    messages: [],
  });
  const userData = useRecoilValue(userDataAtom);
  console.log({ currentRoomId });

  //채팅방에 대한 데이터 가져오는 쿼리
  const { data: chatRoomData } = useQuery({
    queryKey: ['chatRoom', currentRoomId],
    queryFn: async () => await chatAPI.getChatRoom({ roomId: currentRoomId }),
    enabled: !!currentRoomId,
  });

  const sessionId = chatRoomData?.sessionId;
  const senderId = chatRoomData?.sender.userId;

  const isSubscribed = useRef(false); // subscribe 호출 여부 체크

  // StompJS 인스턴스 생성 및 연결
  const connect = () => {
    console.log('in connect', sessionId);
    chatSocketClient.connect(() => {
      console.log('callback', sessionId);
      if (sessionId) {
        subscribe(sessionId);
        setMessageRoom({ messages: chatRoomData.recentMessages });
      }
    });
  };

  const disconnect = () => {
    chatSocketClient.disconnect();
  };

  useEffect(() => {
    if (!chatSocketClient.isConnected() && sessionId) {
      console.log({ sessionId });
      connect();
    }

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      disconnect();
    };
  }, [sessionId]);

  // 토픽 구독을 위한 함수
  const subscribe = (sessionId: string) => {
    console.log('in subscribe, sessionId', sessionId);
    if (isSubscribed.current) return; // 이미 subscribe가 되어 있으면 아무 동작 안 함

    console.log('in subscribe');

    chatSocketClient.subscribeToChatRoom(sessionId, (msg) => {
      console.log({ msg });
      setMessageRoom((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
      }));
    });

    isSubscribed.current = true; // subscribe가 되면 상태를 true로 설정
  };

  // 메세지 발행을 위한 함수
  const sendMessage = (text: string, type: ChatMessageType) => {
    if (!chatSocketClient.isConnected() || !sessionId || !userData) return;

    switch (type) {
      case 'TEXT':
        chatSocketClient.sendMessage({
          chatRoomId: currentRoomId,
          senderId: userData.userId,
          content: text,
          sessionId,
          messageType: type,
        });
        break;
      case 'ACTION':
        //TODO:: 근데 액션을 프론트에서 직접 보낼 일이 있을런지..?
        chatSocketClient.sendMessage({
          chatRoomId: currentRoomId,
          senderId: userData.userId,
          content: text,
          sessionId,
          messageType: type,
        });
        break;
      case 'IMAGE':
      // TODO: 이미지 업로드 API 호출하여 우선 처리 후 메세지 전송 필요
    }

    setText('');
  };

  return {
    connect,
    disconnect,
    sendMessage,
    chatRoomData,
    messageRoom,
    setMessageRoom,
    text,
    setText,
    subscribe,
  };
};
