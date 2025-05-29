import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { ReqChatMessageType } from '@market-duck/types/chat';
import { envManager } from '@market-duck/utils/env';
import { Client as StompClient } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export class SocketClient {
  private static instance: SocketClient;
  private client: StompClient;
  // private isConnectedWebSocket: boolean = false;

  private constructor() {
    const baseUrl = 'https://marketduck.server-su.site/ws-chat';
    const WEB_SOCKET_URL = envManager.getApiUrl() + '/ws-chat';
    const accessToken = localStorage.getItem('accessToken') || '';

    const url = `${baseUrl}?token=${accessToken.replace(/^Bearer\s+/i, '')}`;
    console.log({ accessToken, url });

    this.client = new StompClient({
      webSocketFactory: () => new SockJS(url),
      connectHeaders: {
        Authorization: accessToken,
      },
      debug: (str) => console.log(str), // 디버깅 메시지 출력
      reconnectDelay: 10000,
      heartbeatIncoming: 2000,
      heartbeatOutgoing: 2000,
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);
      },
      onWebSocketError: (event) => {
        console.error('❌ WebSocket error:', event);
      },
      onConnect: (frame) => {
        console.log('onConnect:', frame);
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 종료');
      },
      onWebSocketClose: () => {
        console.warn('WebSocket 연결이 닫혔습니다.');
      },
    });
  }

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient();
    }
    return SocketClient.instance;
  }

  public connect(): void {
    console.log('connect', this.client.active);
    if (!this.client.active) {
      console.log('activate');
      this.client.activate();
    }
  }

  public disconnect(): void {
    console.log('disconnect');
    if (this.client.active) {
      console.log('deactivate');
      this.client.deactivate();
    }
  }

  public subscribeToChat(sessionId: string, callback: (message: ChatMessageModel) => void): void {
    console.log('subscribeToChat');
    if (this.client.connected) {
      this.client.subscribe(`/sub/chat/room/${sessionId}`, (message) => {
        callback(ChatMessageModel.fromJson(JSON.parse(message.body)));
      });
    }
  }

  public sendMessage(message: ReqChatMessageType): void {
    if (this.client.connected) {
      this.client.publish({
        destination: '/pub/chat/message',
        body: JSON.stringify(message),
      });
    }
  }

  public isConnected(): boolean {
    console.log('isConnected method:', this.client.connected);
    return this.client.connected;
  }
}
