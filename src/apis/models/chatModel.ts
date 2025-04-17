import { BaseUserModel, IBaseUserModelData } from '@market-duck/apis/models/userModel';
import { ChatRoomStatusType } from '@market-duck/types/chat';

export interface IBaseChatMessageModel {
  messageId: number;
  content: string;
  senderId: number;
  senderNickname: string;
  senderProfileImage: string;
  chatRoomId: number;
  sessionId: string;
  messageType: string;
  createAt: string;
  read: boolean;
}

export interface IBaseChatRoomModel {
  chatRoomId: number;
  sessionId: string;
  feedId: number;
  feedTitle: string;
  feedImageUrl: string;
  sender: IBaseUserModelData;
  receiver: IBaseUserModelData;
  status: ChatRoomStatusType;
  createdAt: string;
  recentMessages: IBaseChatMessageModel[];
  unreadCount: number;
}

export class ChatMessageModel {
  messageId: number;
  content: string;
  senderId: number;
  senderNickname: string;
  senderProfileImage: string;
  chatRoomId: number;
  sessionId: string;
  messageType: string;
  createAt: Date;
  read: boolean;
  constructor(data: IBaseChatMessageModel) {
    this.messageId = data.messageId;
    this.content = data.content;
    this.senderId = data.senderId;
    this.senderNickname = data.senderNickname;
    this.senderProfileImage = data.senderProfileImage;
    this.chatRoomId = data.chatRoomId;
    this.sessionId = data.sessionId;
    this.messageType = data.messageType;
    this.createAt = new Date(data.createAt);
    this.read = data.read;
  }
  static fromJson(data: IBaseChatMessageModel) {
    return new ChatMessageModel(data);
  }
}

export class ChatRoomModel {
  chatRoomId: number;
  sessionId: string;
  feedId: number;
  feedTitle: string;
  feedImageUrl: string;
  sender: BaseUserModel;
  receiver: BaseUserModel;
  status: ChatRoomStatusType;
  createdAt: Date;
  recentMessages: ChatMessageModel[];
  unreadCount: number;
  constructor(data: IBaseChatRoomModel) {
    this.chatRoomId = data.chatRoomId;
    this.sessionId = data.sessionId;
    this.feedId = data.feedId;
    this.feedTitle = data.feedTitle;
    this.feedImageUrl = data.feedImageUrl;
    this.sender = new BaseUserModel(data.sender);
    this.receiver = new BaseUserModel(data.receiver);
    this.status = data.status;
    this.createdAt = new Date(data.createdAt);
    this.recentMessages = data.recentMessages.map((item) => new ChatMessageModel(item));
    this.unreadCount = data.unreadCount;
  }
  static fromJson(data: IBaseChatRoomModel) {
    return new ChatRoomModel(data);
  }
}
