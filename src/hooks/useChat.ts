import { userDataAtom } from '@market-duck/atoms/user.atom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Client as StompClient } from '@stomp/stompjs';
import { envManager } from '@market-duck/utils/env';
import { useInfiniteQuery } from '@tanstack/react-query';

enum ChatAction {
  SEND_ADDRESS = 'SEND_ADDRESS',
  SEND_ACCOUNT = 'SEND_ACCOUNT',
}

export const useChat = (currentRoomId: number) => {
  const [text, setText] = useState('');
  const [messageRoom, setMessageRoom] = useState<{ messages: any[] }>({
    messages: [],
  });
  const userData = useRecoilValue(userDataAtom);
  const [receiverId, setReceiverId] = useState(0);
  const WEB_SOCKET_URL = envManager.getApiUrl()?.replace('https', 'ws') + '/ws-chat';

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

  if (!userData) return;

  const sessionId = data?.pages[0].data.sessionId;
  const senderId = data?.pages[0].data.senderId;

  const client = useRef<StompClient>(
    new StompClient({
      brokerURL: WEB_SOCKET_URL,
      connectHeaders: {
        Authorization: localStorage.getItem('accessToken') || '',
      },
      debug: () => {},
      reconnectDelay: 3000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      // 핸드셰이크 과정을 통해 연결이 완료되면 정해진 토픽을 구독
      onStompError: (frame) => {
        console.error(frame);
      },
    }),
  );

  // StompJS 인스턴스 생성 및 연결
  const connect = () => {
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  useEffect(() => {
    // CurrentRoomId는 특정 채팅방을 클릭할 때 마다 해당 방의 ID를 담는 전역 상태
    // 바뀔 때마다 useEffect가 작동
    const setRoom = async () => {
      // 기존 대화내역을 서버에서 받아오고 (initialChatSetting)
      await initialChatSetting();
      // StompJs 인스턴스를 생성하여 연결한다
      connect();
    };
    setRoom();
    // 컴포넌트 언마운트 시 연결 종료
    return () => disconnect();
  }, [currentRoomId]);

  // 기존 대화내역을 서버에서 받아오는 함수
  const initialChatSetting = async () => {
    // if (currentRoomId !== 0 && currentRoomId !== undefined)
    //   await axios
    //     .get(`/messages/rooms/${profileId}/${currentRoomId}`)
    //     .then(({ data: { data } }) => {
    //       if (profileId === data.tuteeId) {
    //         setReceiverId(data.tutorId);
    //       } else setReceiverId(data.tuteeId);
    //       setMessageRoom(data);
    //     })
    //     .catch((err) => console.log(err));
  };

  // 토픽 구독을 위한 함수
  const subscribe = (sessionId: string) => {
    client.current.subscribe(`/sub/chat/room/${sessionId}`, (res) => {
      setMessageRoom((prev) => ({
        ...prev,
        messages: [...prev.messages, JSON.parse(res.body)],
      }));
    });
  };

  // 메세지 발행을 위한 함수
  const publish = (text: string) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: `/pub/chat/message`,
      body: JSON.stringify({
        chatRoomId: currentRoomId,
        senderId: 2,
        content: text,
        sessionId: sessionId,
        messageType: 'TEXT',
      }),
    });
    setText('');
  };

  const sendText = () => {
    publish(text);
    setText('');
  };

  const sendAction = (action: ChatAction) => {
    if (!client.current.connected) {
      return;
    }

    publish(action);
  };

  return {
    sendText,
    sendAction,
    disconnect,
    publish,
    messageRoom,
    setMessageRoom,
    text,
    setText,
    subscribe,
  };
};
