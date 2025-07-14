import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { chatSocketClient } from '@market-duck/utils/socketClient';
import { useEffect, useRef } from 'react';

export const useChatSocket = ({
  sessionId,
  onMessage,
}: {
  sessionId?: string;
  onMessage: (msg: ChatMessageModel) => void;
}) => {
  const isSubscribed = useRef(false);

  useEffect(() => {
    if (!chatSocketClient.isConnected() && sessionId) {
      chatSocketClient.connect(() => {
        if (!isSubscribed.current && sessionId) {
          chatSocketClient.subscribeToChatRoom(sessionId, onMessage);
          isSubscribed.current = true;
        }
      });
    }

    return () => {
      chatSocketClient.disconnect();
      isSubscribed.current = false;
    };
  }, [sessionId]);

  return {
    sendMessage: chatSocketClient.sendMessage,
    isConnected: chatSocketClient.isConnected,
  };
};
