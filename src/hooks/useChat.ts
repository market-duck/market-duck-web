import { chatSocketClient } from './../utils/chatTest';
import { chatAPI } from './../apis/chatAPI';
import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { ChatMessageType } from '@market-duck/types/chat';
import { SocketClient } from '@market-duck/utils/socketClient';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
  console.log({ currentRoomId });

  //채팅방에 대한 데이터 가져오는 쿼리
  const { data: chatRoomData } = useQuery({
    queryKey: ['chatRoom', currentRoomId],
    queryFn: async () => await chatAPI.getChatRoom({ roomId: currentRoomId }),
    enabled: !!currentRoomId,
  });

  const sessionId = chatRoomData?.sessionId;
  const senderId = chatRoomData?.sender.userId;

  //TODO:: 메시지 리스트에 대한 관리로 수정해야 됨
  // const { data, fetchNextPage, isLoading, isFetchingNextPage, error } = useInfiniteQuery({
  //   queryKey: ['chat', currentRoomId],
  //   queryFn: () => {
  //     return {
  //       data: { sessionId: '', senderId: 0 },
  //     };
  //   },
  //   getNextPageParam: () => 0,
  //   initialPageParam: 0,
  // });

  // const client = useRef<SocketClient>(SocketClient.getInstance());
  const isSubscribed = useRef(false); // subscribe 호출 여부 체크

  // StompJS 인스턴스 생성 및 연결
  const connect = () => {
    console.log('in connect', sessionId);
    chatSocketClient.connect(() => {
      console.log('callback', sessionId);
      if (sessionId) {
        subscribe(sessionId);
      }
    });
  };

  const disconnect = () => {
    chatSocketClient.disconnect();
  };

  // useEffect(() => {
  //   if (!chatSocketClient.isConnected() && sessionId) {
  //     console.log({ sessionId });
  //     connect();
  //   }

  //   // 컴포넌트 언마운트 시 연결 종료
  //   return () => {
  //     disconnect();
  //   };
  // }, [sessionId]);

  // 토픽 구독을 위한 함수
  const subscribe = (sessionId: string) => {
    if (isSubscribed.current) return; // 이미 subscribe가 되어 있으면 아무 동작 안 함

    console.log('in subscribe');

    chatSocketClient.subscribeToChatRoom(sessionId, (msg) => {
      console.log({ msg });
      // setMessageRoom((prev) => ({
      //   ...prev,
      //   messages: [...prev.messages, msg],
      // }));
    });

    isSubscribed.current = true; // subscribe가 되면 상태를 true로 설정
  };

  // 메세지 발행을 위한 함수
  const sendMessage = (text: string, type: ChatMessageType) => {
    if (!chatSocketClient.isConnected() || !sessionId || !userData) return;

    // chatSocketClient.sendMessage({
    //   chatRoomId: currentRoomId,
    //   senderId: userData.userId,
    //   content: text,
    //   sessionId,
    //   messageType: type,
    // });
    // setText('');
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

  // useEffect(() => {
  //   console.log({ sessionId, isConnected: chatSocketClient.isConnected() });
  //   if (sessionId && chatSocketClient.isConnected()) {
  //     subscribe(sessionId);
  //     setMessageRoom({ messages: chatRoomData.recentMessages || [] });
  //   }
  // }, [sessionId]); // sessionId가 변경될 때마다 subscribe 호출

  return {
    sendText,
    sendAction,
    connect,
    disconnect,
    publish: sendMessage,
    chatRoomData,
    messageRoom,
    setMessageRoom,
    text,
    setText,
    subscribe,
  };
};
