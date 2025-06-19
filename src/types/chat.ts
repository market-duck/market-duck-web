export type ChatRoomStatusType = 'ACTIVE' | 'INACTIVE';

export const ChatMessageTypeEnum = {
  TEXT: 'TEXT',
  SYSTEM: 'SYSTEM',
  IMAGE: 'IMAGE',
};

export type ChatMessageType = (typeof ChatMessageTypeEnum)[keyof typeof ChatMessageTypeEnum];

export interface SendMessageInfoType {
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
