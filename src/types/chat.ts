export type ChatRoomStatusType = 'ACTIVE' | 'INACTIVE';

export type ChatMessageType = 'TEXT' | 'ACTION' | 'IMAGE';

export interface ReqChatMessageType {
  chatRoomId: number;
  senderId: number;
  content: string;
  sessionId: string;
  messageType: ChatMessageType;
}

export interface ReqChatRoomType {
  feedId: number;
  receiverId: number;
}
