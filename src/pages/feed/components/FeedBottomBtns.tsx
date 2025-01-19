import { ChatBubbleLeftRightIcon, HeartIcon as LineHeart } from '@heroicons/react/24/outline';
import { feedAPI } from '@market-duck/apis/feedAPI';
import { FeedDetailModel } from '@market-duck/apis/models/feedModel';
import { Button } from '@market-duck/components/Button/Button';
import { Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { ButtonClickHandler } from '@market-duck/types/handler';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AppColor, AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const BtnContainer = styled(Row)`
  position: sticky;
  width: 100%;
  left: 0;
  bottom: 60px;
  padding: ${AppSpcing.XS} ${AppSpcing.M};
  background-color: ${AppColor.WHITE.hex};
`;

const BtnContents = styled(Row)`
  width: 100%;
  > span {
    flex: 1;
  }
  > svg {
    width: 24px;
    height: 24px;
  }
`;

export const FeedBottomBtns = ({ isMyFeed, feedDetail }: { isMyFeed: boolean; feedDetail: FeedDetailModel }) => {
  const navigate = useNavigate();
  const { confirm } = useDialog();
  const { mutateAsync } = useMutation({
    mutationKey: ['feed', 'read', feedDetail.feedId],
    mutationFn: async () => {
      await feedAPI.deleteFeed({ feedId: feedDetail.feedId });
    },
  });
  const btnHandler: ButtonClickHandler = async ({ currentTarget }) => {
    const { id } = currentTarget;
    if (isMyFeed) {
      if (id === 'primary') {
        navigate('/feed/edit', { state: feedDetail });
      } else if (id === 'secondary') {
        const result = await confirm({
          title: '피드 삭제',
          desc: '피드를 삭제하시겠어요?',
          positiveBtnText: '삭제',
        });
        if (result) {
          await mutateAsync();
          navigate(-1);
        }
      }
    } else {
      if (id === 'primary') {
        console.log('채팅');
      } else if (id === 'secondary') {
        console.log('찜');
      }
    }
  };
  return (
    <BtnContainer gap="XS">
      <Button id="secondary" size="medium" variant="secondary" row onClick={btnHandler}>
        {isMyFeed ? (
          '삭제'
        ) : (
          <BtnContents gap="XS">
            {/* Todo: 찜 여부 확인해서 아이콘 렌더링 필요 */}
            <LineHeart color={AppSemanticColor.ICON_INTERACTIVE_PRIMARY.hex} />
            {/* <FillHeart color={AppSemanticColor.ICON_INTERACTIVE_PRIMARY.hex} /> */}
            <Typo tag="span" type="BODY_MD" className={AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.color} align="center">
              찜
            </Typo>
          </BtnContents>
        )}
      </Button>
      <Button id="primary" size="medium" variant="primary" row onClick={btnHandler}>
        {isMyFeed ? (
          '수정'
        ) : (
          <BtnContents gap="XS">
            <ChatBubbleLeftRightIcon color={AppSemanticColor.ICON_INVERSE.hex} />
            <Typo tag="span" type="BODY_MD" className={AppSemanticColor.TEXT_INVERSE.color} align="center">
              채팅
            </Typo>
          </BtnContents>
        )}
      </Button>
    </BtnContainer>
  );
};
