import { chatSocketClient } from '../utils/socketClient';
import { chatAPI } from './../apis/chatAPI';
import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { ChatMessageType, ChatMessageTypeEnum } from '@market-duck/types/chat';
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

  //채팅방에 대한 데이터 가져오는 쿼리
  const { data: chatRoomData } = useQuery({
    queryKey: ['chatRoom', currentRoomId],
    queryFn: async () => await chatAPI.getChatRoom({ roomId: currentRoomId }),
    enabled: !!currentRoomId,
  });

  const sessionId = chatRoomData?.sessionId;
  const senderId = chatRoomData?.sender.userId;

  const isSubscribed = useRef(false);

  const connect = () => {
    chatSocketClient.connect(() => {
      if (sessionId) {
        subscribe(sessionId);
        //TODO::일단 reverse 먹여놨는데 추후 서버에서 리스트 반대로 주면 제거하기
        setMessageRoom({ messages: chatRoomData.recentMessages.reverse() });
      }
    });
  };

  const disconnect = () => {
    chatSocketClient.disconnect();
  };

  useEffect(() => {
    if (!chatSocketClient.isConnected() && sessionId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [sessionId]);

  const subscribe = (sessionId: string) => {
    if (isSubscribed.current) return;

    chatSocketClient.subscribeToChatRoom(sessionId, (msg) => {
      console.log({ msg });
      setMessageRoom((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
      }));
    });

    isSubscribed.current = true;
  };

  const sendMessage = ({ text, type, imageFiles }: { text: string; type: ChatMessageType; imageFiles?: File[] }) => {
    if (!chatSocketClient.isConnected() || !sessionId || !userData) return;

    console.log('here?', type, text, imageFiles);

    switch (type) {
      case ChatMessageTypeEnum.TEXT:
        chatSocketClient.sendMessage({
          chatRoomId: currentRoomId,
          senderId: userData.userId,
          content: text,
          sessionId,
          messageType: type,
        });
        break;
      case ChatMessageTypeEnum.SYSTEM:
        //TODO:: 근데 액션을 프론트에서 직접 보낼 일이 있을런지..?
        // chatSocketClient.sendMessage({
        //   chatRoomId: currentRoomId,
        //   senderId: userData.userId,
        //   content: text,
        //   sessionId,
        //   messageType: type,
        // });
        break;
      case ChatMessageTypeEnum.IMAGE:
        if (imageFiles) {
          imageSend({ imageFiles, sessionId });
        }
        break;
    }

    setText('');
  };

  const imageSend = async ({ imageFiles, sessionId }: { imageFiles: File[]; sessionId: string }) => {
    if (!userData) return;

    try {
      const imageUrlList = await chatAPI.uploadMessageImage({ image: imageFiles });

      if (imageUrlList) {
        imageUrlList.map((url) => {
          chatSocketClient.sendMessage({
            chatRoomId: currentRoomId,
            senderId: userData.userId,
            content: url,
            sessionId,
            messageType: ChatMessageTypeEnum.IMAGE,
          });
        });
      }
    } catch (error) {
      //TODO:: 이미지 업로드 혹은 이미지 전송 실패 시 핸들링
    }
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
