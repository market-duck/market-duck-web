import { chatAPI } from '@market-duck/apis/chatAPI';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useChatDataWithPagination = (currentRoomId: number) => {
  return useInfiniteQuery({
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
};
