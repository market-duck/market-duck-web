import { chatAPI } from '@market-duck/apis/chatAPI';
import { feedAPI } from '@market-duck/apis/feedAPI';
import { FeedDetailModel } from '@market-duck/apis/models/feedModel';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { Button } from '@market-duck/components/Button/Button';
import { Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { NetworkResultType } from '@market-duck/types/api';
import { ButtonClickHandler } from '@market-duck/types/handler';
import { queryClient } from '@market-duck/utils/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AppColor, AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const BtnContainer = styled(Row)`
  position: sticky;
  width: 100%;
  left: 0;
  bottom: 60px;
  padding: ${AppSpacing.XS} ${AppSpacing.M};
  background-color: ${AppColor.WHITE.hex};
`;

export const FeedBottomBtns = ({ feedDetail }: { feedDetail: FeedDetailModel }) => {
  const user = useRecoilValue(userDataAtom);
  const navigate = useNavigate();
  const { confirm, alert } = useDialog();

  const { mutateAsync: createChatRoom } = useMutation({
    mutationKey: ['chat', 'create', feedDetail.feedId],
    mutationFn: async () =>
      await chatAPI.createChatRoom({ feedId: feedDetail.feedId, receiverId: feedDetail.userInfo.userId }),
    onSuccess: (data) => {
      navigate('/chat/room', { state: { roomId: data.chatRoomId } });
    },
    onError: (error) => {
      console.error(error);
      alert({ title: '채팅방 생성 실패', desc: '채팅방 생성에 실패했습니다.\n다시 시도해주세요.' });
    },
  });

  const { mutateAsync: likeFeed } = useMutation({
    mutationKey: ['feed', 'like', feedDetail.feedId],
    mutationFn: async () => await feedAPI.likeFeed({ feedId: feedDetail.feedId }),
  });

  const btnHandler: ButtonClickHandler = async ({ currentTarget }) => {
    const { id } = currentTarget;

    if (!user) {
      const result = await confirm({
        title: '로그인 후 이용해주세요.',
        desc: '로그인이 필요한 서비스입니다.',
        positiveBtnText: '로그인',
      });

      if (result) navigate('/login');
      return;
    }

    if (id === 'primary') {
      await createChatRoom();
    } else if (id === 'secondary') {
      const result = await likeFeed();
      if (result !== NetworkResultType.fail)
        queryClient.setQueryData<FeedDetailModel>(['feed', 'read', feedDetail.feedId], (old) => {
          if (!old) return;
          return old.updateLiked(result, old.likeCount + (result ? 1 : -1));
        });
    }
  };

  return (
    <BtnContainer gap="XS">
      <Button
        id="secondary"
        size="medium"
        variant="secondary"
        leftIcon="HeartIcon"
        iconFill={feedDetail.liked}
        onClick={btnHandler}
      />
      <Button id="primary" size="medium" variant="primary" row onClick={btnHandler}>
        <Typo tag="span" type="BODY_MD" className={AppSemanticColor.TEXT_INVERSE.color} align="center">
          채팅하기
        </Typo>
      </Button>
    </BtnContainer>
  );
};

export const MyFeedBottomBtns = ({ feedDetail }: { feedDetail: FeedDetailModel }) => {
  const navigate = useNavigate();
  const { confirm } = useDialog();
  const { mutateAsync: deleteFeed } = useMutation({
    mutationKey: ['feed', 'read', feedDetail.feedId],
    mutationFn: async () => {
      await feedAPI.deleteFeed({ feedId: feedDetail.feedId });
    },
  });

  const btnHandler: ButtonClickHandler = async ({ currentTarget }) => {
    const { id } = currentTarget;

    if (id === 'primary') {
      navigate('/feed/edit', { state: feedDetail });
    } else if (id === 'secondary') {
      const result = await confirm({
        title: '피드 삭제',
        desc: '피드를 삭제하시겠어요?',
        positiveBtnText: '삭제',
        positiveBtnVariant: 'danger',
      });
      if (result) {
        await deleteFeed();
        navigate(-1);
      }
    } else if (id === 'tertiary') {
      navigate('/chat');
    }
  };

  return (
    <BtnContainer gap="XS">
      <Button
        id="tertiary"
        size="medium"
        variant="secondary"
        leftIcon="ChatBubbleLeftRightIcon"
        iconFill={feedDetail.liked}
        onClick={btnHandler}
      />
      <Button id="secondary" size="medium" variant="danger" row onClick={btnHandler}>
        삭제
      </Button>
      <Button id="primary" size="medium" variant="primary" row onClick={btnHandler}>
        수정
      </Button>
    </BtnContainer>
  );
};
