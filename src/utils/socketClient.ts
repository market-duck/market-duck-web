import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { ReqChatMessageType } from '@market-duck/types/chat';
import { envManager } from '@market-duck/utils/env';
import { Client as StompClient } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

export class SocketClient {
  private static instance: SocketClient;
  private client: StompClient;
  private isConnectedWebSocket: boolean = false;

  private constructor() {
    const WEB_SOCKET_URL = envManager.getApiUrl()?.replace('https', 'ws') + '/ws-chat';

    this.client = new StompClient({
      webSocketFactory: () => new SockJS(WEB_SOCKET_URL),
      connectHeaders: {
        Authorization: localStorage.getItem('accessToken') || '',
      },
      debug: () => {},
      reconnectDelay: 3000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      onStompError: (frame) => {
        console.error('WebSocket 에러:', frame);
      },
    });

    this.client.onConnect = () => {
      this.isConnectedWebSocket = true;
      console.log('WebSocket 연결 성공');
    };

    this.client.onDisconnect = () => {
      this.isConnectedWebSocket = false;
      console.log('WebSocket 연결 종료');
    };
  }

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  public connect(): void {
    if (!this.isConnectedWebSocket) {
      this.client.activate();
    }
  }

  public disconnect(): void {
    if (this.isConnectedWebSocket) {
      this.client.deactivate();
    }
  }

  public subscribeToChat(sessionId: string, callback: (message: ChatMessageModel) => void): void {
    if (this.isConnectedWebSocket) {
      this.client.subscribe(`/sub/chat/room/${sessionId}`, (message) => {
        callback(ChatMessageModel.fromJson(JSON.parse(message.body)));
      });
    }
  }

  public sendMessage(message: ReqChatMessageType): void {
    if (this.isConnectedWebSocket) {
      this.client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(message),
      });
    }
  }

  public isConnected(): boolean {
    return this.isConnectedWebSocket;
  }
}
