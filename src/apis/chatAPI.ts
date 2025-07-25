import { fetchClient } from '@market-duck/apis/fetchClient';
import {
  ChatMessageModel,
  ChatRoomModel,
  IBaseChatMessageModel,
  IBaseChatRoomModel,
} from '@market-duck/apis/models/chatModel';
import { IAPIResponse, NetworkResultType } from '@market-duck/types/api';
import { ReqChatRoomType } from '@market-duck/types/chat';

class ChatAPI {
  // 채팅방 목록 조회
  async getChatRooms() {
    const {
      data: { data },
    } = await fetchClient.get<IAPIResponse<IBaseChatRoomModel[]>>(`/chat/rooms`);
    return data.map((chatroom) => ChatRoomModel.fromJson(chatroom));
  }

  async getChatRoom({ roomId, page }: { roomId: number; page: number }) {
    const {
      data: { data },
    } = await fetchClient.get<IAPIResponse<IBaseChatRoomModel>>(`/chat/rooms/${roomId}?page=${page}`);
    return ChatRoomModel.fromJson(data);
  }

  // 채팅방 생성
  async createChatRoom(roomData: ReqChatRoomType) {
    const {
      data: { data },
    } = await fetchClient.post<IAPIResponse<IBaseChatRoomModel>>(
      `/chat/rooms?feedId=${roomData.feedId}&receiverId=${roomData.receiverId}`,
    );
    return ChatRoomModel.fromJson(data);
  }

  // 채팅방 비활성화
  async leaveChatRoom({ roomId }: { roomId: number }) {
    const { status } = await fetchClient.patch(`/chat/rooms/${roomId}/leave`);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  // 채팅 메시지 전송, HTTP
  async sendMessage({ chatRoomId, content }: { chatRoomId: number; content: string }) {
    const {
      status,
      data: { data },
    } = await fetchClient.post<IAPIResponse<IBaseChatMessageModel>>(`/chat/rooms/${chatRoomId}/message`, { content });
    return {
      status: status <= 299 ? NetworkResultType.success : NetworkResultType.fail,
      message: ChatMessageModel.fromJson(data),
    };
  }

  async uploadMessageImage({ image }: { image: File[] }) {
    const file = new FormData();
    image.forEach((item) => file.append('file', item));
    const { data } = await fetchClient.post<IAPIResponse<{ imageUrl: string }[]>>(`/chat/image`, file);
    return data.data.map((item) => item.imageUrl);
  }

  async sendImageMessage({ chatRoomId, imageUrlList }: { chatRoomId: number; imageUrlList: string[] }) {
    const promises = imageUrlList.map(async (imageUrl) => {
      await fetchClient.post<IAPIResponse<IBaseChatMessageModel>>(
        `/chat/rooms/${chatRoomId}/images?imageUrl=${imageUrl}`,
      );
    });

    await Promise.all(promises);
  }
}

export const chatAPI = new ChatAPI();
