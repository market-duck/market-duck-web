import { chatSocketClient } from '../utils/socketClient';
import { chatAPI } from './../apis/chatAPI';
import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { ChatMessageType, ChatMessageTypeEnum } from '@market-duck/types/chat';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

/**
 * 추후 추가할 기능
 */
enum ChatAction {
  SEND_ADDRESS = 'SEND_ADDRESS',
  SEND_ACCOUNT = 'SEND_ACCOUNT',
}

export const useChat = (currentRoomId: number, scrollRef?: React.RefObject<HTMLDivElement>) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<{ messages: ChatMessageModel[] }>({
    messages: [],
  });
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const userData = useRecoilValue(userDataAtom);

  //채팅방에 대한 데이터 가져오는 쿼리
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['chatRoom', currentRoomId],
    queryFn: async ({ pageParam = 0 }) => await chatAPI.getChatRoom({ roomId: currentRoomId, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.pageInfo) return undefined;

      const { page, totalPages } = lastPage.pageInfo;
      return page + 1 < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 0,
    enabled: !!currentRoomId,
  });

  const allMessages: ChatMessageModel[] = data?.pages.flatMap((page) => page.chatRoom.recentMessages) ?? [];

  const sessionId = data?.pages[0].chatRoom.sessionId;
  const senderId = data?.pages[0].chatRoom.sender.userId;

  const isSubscribed = useRef(false);

  const connect = () => {
    chatSocketClient.connect(() => {
      if (sessionId) {
        subscribe(sessionId);
        setMessages({ messages: allMessages.reverse() });
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
      setMessages((prev) => ({
        ...prev,
        messages: [...prev.messages, msg],
      }));
    });

    isSubscribed.current = true;
  };

  const sendMessage = ({ text, type, imageFiles }: { text: string; type: ChatMessageType; imageFiles?: File[] }) => {
    if (!chatSocketClient.isConnected() || !sessionId || !userData) return;

    setShouldAutoScroll(true);

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

  const handleLoadMore = async () => {
    const scrollEl = scrollRef?.current;
    const prevScrollHeight = scrollEl?.scrollHeight ?? 0;
    const prevScrollTop = scrollEl?.scrollTop ?? 0;

    setShouldAutoScroll(false);

    const result = await fetchNextPage();
    if (!result?.data?.pages) return;

    const allMessages = result.data.pages.flatMap((page) => page.chatRoom.recentMessages).reverse();

    setMessages({ messages: allMessages });

    requestAnimationFrame(() => {
      const newScrollHeight = scrollEl?.scrollHeight;
      if (scrollEl && newScrollHeight) {
        scrollEl.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight);
      }
    });
  };

  useEffect(() => {
    if (data?.pages) {
      const allMessages = data.pages.flatMap((page) => page.chatRoom.recentMessages).reverse(); // 정렬 필요에 따라

      setMessages({ messages: allMessages });
    }
  }, [data]);

  return {
    connect,
    disconnect,
    sendMessage,
    chatRoomData: data?.pages[0],
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
  };
};
