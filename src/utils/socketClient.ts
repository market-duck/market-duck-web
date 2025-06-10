import { envManager } from '@market-duck/utils/env';
import SockJS from 'sockjs-client';
import { Client, StompSubscription } from '@stomp/stompjs';
import { ChatMessageModel } from '@market-duck/apis/models/chatModel';
import { ReqChatMessageType } from '@market-duck/types/chat';

type MessageHandler = (message: ChatMessageModel) => void;
type Callback = () => void;

class ChatSocketClient {
  private stompClient: Client | null = null;
  private connected = false;
  private subscriptions: Record<string, StompSubscription> = {};
  private messageHandlers: MessageHandler[] = [];
  private connectionTimeoutId: ReturnType<typeof setTimeout> | null;

  constructor() {
    this.stompClient = null;
    this.connected = false;
    this.subscriptions = {};
    this.messageHandlers = [];
    this.connectionTimeoutId = null;
  }

  // 웹소켓 연결
  connect(callback?: Callback): void {
    const token = localStorage.getItem('accessToken');
    console.log({ token });
    if (!token) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      return;
    }

    // SockJS와 STOMP 클라이언트 생성 및 연결
    this.stompClient = new Client({
      webSocketFactory: () => {
        const origin = envManager.getChatSocketOrigin();
        // const url = `${origin}?token=${token.replace(/^Bearer\s+/i, '')}`;
        const url = `${origin}?token=${token}`;
        console.log('[WS] Connecting', url);
        return new SockJS(url);
      },

      connectHeaders: {
        Authorization: `${token}`,
      },
      onConnect: (frame) => {
        this.connected = true;
        if (this.connectionTimeoutId !== null) {
          clearTimeout(this.connectionTimeoutId);
        }
        console.log('웹소켓 연결 성공!');
        if (callback) {
          console.log('콜백 부르기');
          callback();
        }
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 종료');
      },
      debug: (str) => {
        console.log('[STOMP DEBUG]', str);
      },
      onStompError: (frame) => {
        console.error('[STOMP ERROR]', frame);
      },
      onWebSocketClose: (event) => {
        console.warn('[WS CLOSED]', event);
      },
      onWebSocketError: (event) => {
        console.error('[WS ERROR]', event);
      },
      reconnectDelay: 3000, // 재연결 시도 간격(ms)
    });

    // 연결 시도 후 일정 시간 내에 연결되지 않으면 에러 처리
    this.connectionTimeoutId = setTimeout(() => {
      if (!this.connected) {
        console.error('웹소켓 연결 타임아웃');
        this.stompClient?.deactivate(); // 끊기
      }
    }, 10000); // 예: 5초 이내에 연결 안 되면 실패로 처리

    // 연결 설정
    this.stompClient.activate();
  }

  // 채팅방 구독
  subscribeToChatRoom(sessionId: string, callback?: MessageHandler) {
    if (!this.connected || !this.stompClient) {
      console.error('웹소켓이 연결되어 있지 않습니다.');
      return;
    }

    const destination = `/sub/chat/room/${sessionId}`;

    // 이미 구독 중인 경우 중복 구독 방지
    if (this.subscriptions[destination]) {
      console.log(`이미 ${destination}을 구독 중입니다.`);
      return;
    }

    // 새로운 구독 추가
    const subscription = this.stompClient.subscribe(destination, (message) => {
      console.log('subscription message', message);
      const receivedMessage = ChatMessageModel.fromJson(JSON.parse(message.body));
      console.log('메시지 수신:', receivedMessage);

      // 콜백 실행
      if (callback) callback(receivedMessage);

      // 전역 메시지 핸들러 실행
      this.messageHandlers.forEach((handler) => handler(receivedMessage));
    });

    // 구독 정보 저장
    this.subscriptions[destination] = subscription;
    console.log(`${destination} 구독 완료`);
  }

  // 구독 해제
  unsubscribeFromChatRoom(sessionId: string): void {
    const destination = `/sub/chat/room/${sessionId}`;
    if (this.subscriptions[destination]) {
      this.subscriptions[destination].unsubscribe();
      delete this.subscriptions[destination];
      console.log(`${destination} 구독 해제`);
    }
  }

  // 메시지 전송 (WebSocket)
  sendMessage(message: ReqChatMessageType): void {
    if (!this.connected || !this.stompClient) {
      console.error('웹소켓이 연결되어 있지 않습니다.');
      return;
    }

    this.stompClient.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify(message),
    });
    console.log('메시지 전송:', message);
  }

  // 전역 메시지 핸들러 추가
  addMessageHandler(handler: MessageHandler) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  // 연결 종료
  disconnect() {
    if (this.stompClient && this.connected) {
      // 모든 구독 해제
      Object.keys(this.subscriptions).forEach((destination) => {
        this.subscriptions[destination].unsubscribe();
      });

      this.stompClient.deactivate();
      this.connected = false;
      this.subscriptions = {};
      this.messageHandlers = [];
      console.log('웹소켓 연결 종료');
    }
  }

  // 연결 상태 확인
  isConnected() {
    return this.connected;
  }
}

export const chatSocketClient = new ChatSocketClient();
