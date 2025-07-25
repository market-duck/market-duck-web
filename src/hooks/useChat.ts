import { chatSocketClient } from '../utils/socketClient';
import { chatAPI } from './../apis/chatAPI';
import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { ChatMessageType, ChatMessageTypeEnum } from '@market-duck/types/chat';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useChatDataWithPagination } from '@market-duck/hooks/chat/useChatDataWithPagenation';
import { useChatSocket } from './chat/useChatSocket';

export const useChat = (currentRoomId: number, scrollRef?: React.RefObject<HTMLDivElement>) => {
  const userData = useRecoilValue(userDataAtom);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatDataWithPagination(currentRoomId);

  const [text, setText] = useState('');
  const [localMessages, setLocalMessages] = useState<ChatMessageModel[]>([]);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const allMessages = useMemo(
    () => data?.pages.flatMap((page) => page.chatRoom.recentMessages).reverse() ?? [],
    [data],
  );
  const sessionId = data?.pages[0].chatRoom.sessionId;

  useChatSocket({
    sessionId,
    onMessage: (msg) => {
      setLocalMessages((prev) => [...prev, msg]);
    },
  });

  const sendTextMessage = (text: string) => {
    if (!sessionId || !userData) return;

    chatSocketClient.sendMessage({
      chatRoomId: currentRoomId,
      senderId: userData.userId,
      content: text,
      sessionId,
      messageType: ChatMessageTypeEnum.TEXT,
    });
  };

  const sendImageMessages = async (imageFiles: File[]) => {
    if (!sessionId || !userData) return;

    try {
      const imageUrlList = await chatAPI.uploadMessageImage({ image: imageFiles });

      imageUrlList.forEach((url) => {
        chatSocketClient.sendMessage({
          chatRoomId: currentRoomId,
          senderId: userData.userId,
          content: url,
          sessionId,
          messageType: ChatMessageTypeEnum.IMAGE,
        });
      });
    } catch (error) {
      console.error('이미지 전송 실패', error);
    }
  };

  const sendMessage = ({ text, type, imageFiles }: { text: string; type: ChatMessageType; imageFiles?: File[] }) => {
    if (!chatSocketClient.isConnected() || !sessionId || !userData) return;

    setShouldAutoScroll(true);

    switch (type) {
      case ChatMessageTypeEnum.TEXT:
        sendTextMessage(text);
        break;
      case ChatMessageTypeEnum.IMAGE:
        if (imageFiles) sendImageMessages(imageFiles);
        break;
      case ChatMessageTypeEnum.SYSTEM:
        // 나중에 사용할 수도 있음
        break;
    }

    setText('');
  };

  const handleLoadMore = async () => {
    const scrollEl = scrollRef?.current;
    const prevScrollHeight = scrollEl?.scrollHeight ?? 0;
    const prevScrollTop = scrollEl?.scrollTop ?? 0;

    setShouldAutoScroll(false);

    await fetchNextPage();

    requestAnimationFrame(() => {
      const newScrollHeight = scrollEl?.scrollHeight;
      if (scrollEl && newScrollHeight) {
        scrollEl.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight);
      }
    });
  };

  return {
    sendMessage,
    chatRoomData: data?.pages[0],
    messages: [...allMessages, ...localMessages],
    text,
    setText,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
    shouldAutoScroll,
  };
};
