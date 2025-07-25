import { ChatBubbleLeftRightIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { feedAPI } from '@market-duck/apis/feedAPI';
import { FeedDetailModel } from '@market-duck/apis/models/feedModel';
import { ButtonVariantType } from '@market-duck/components/Button/Button';
import { DropDownMenu } from '@market-duck/components/DropDownMenu/DropDownMenu';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { FeedImageSlider } from '@market-duck/pages/feed/components/FeedImageSlider';
import { FeedUser } from '@market-duck/pages/feed/components/FeedUser';
import { RecommendCard } from '@market-duck/pages/home/components/RecommendCard';
import { FeedStatusType } from '@market-duck/types/feed';
import { getTimeDiff } from '@market-duck/utils/date';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MouseEvent, useEffect, useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Wrap = styled(Column)`
  padding: ${AppSpacing.M} 0;
  .feedAuthorContainer {
    .user {
      font-weight: 500;
      color: ${AppSemanticColor.TEXT_PRIMARY.hex};
    }
    .twitterId {
      font-weight: 500;
      color: ${AppSemanticColor.TEXT_TERTIARY.hex};
    }
  }
  .contents {
    font-weight: 500;
    .feedInfo {
      text-align: right;
      color: ${AppSemanticColor.TEXT_TERTIARY.hex};
    }
    .descContainer {
      margin-top: ${AppSpacing.XXS};
      .title,
      .price {
        color: ${AppSemanticColor.TEXT_PRIMARY.hex};
      }
      .desc {
        color: ${AppSemanticColor.TEXT_SECONDARY.hex};
        white-space: pre-wrap;
      }
    }
  }
  .feedInfo {
    padding-top: ${AppSpacing.XXS};
  }
`;

export const FeedContent = ({ feedDetail, isMyFeed }: { feedDetail: FeedDetailModel; isMyFeed: boolean }) => {
  const {
    userInfo,
    images,
    feedId,
    title,
    content,
    createdAt,
    genreCategory,
    goodsCategory,
    viewCount,
    likeCount,
    status,
    price,
  } = feedDetail;
  const relativeTime = getTimeDiff(createdAt);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { confirm, alert } = useDialog();
  const { mutateAsync: editFeedStatus } = useMutation({
    mutationKey: ['feed', 'update', feedId],
    mutationFn: async (progress: FeedStatusType) => await feedAPI.editFeedStatus({ feedId, feedStatus: progress }),
  });

  const { data: userRecommendFeeds } = useQuery({
    queryKey: ['feed', 'recommend', 'user', userInfo.userId],
    queryFn: () => feedAPI.getFeedsByUserId({ userId: userInfo.userId, page: 0 }),
  });
  const { data: recommendFeeds } = useQuery({
    queryKey: ['feed', 'recommend', genreCategory.map((category) => category.categoryId)],
    queryFn: () => feedAPI.getFeeds({ page: 0, genreIds: genreCategory.map((category) => category.categoryId) }),
  });

  useEffect(() => {
    setSelectedIndex(() => {
      switch (status) {
        case 'ON_SALE_OR_BUY':
          return 0;
        case 'IN_TRANSACTION':
          return 1;
        case 'SOLD_OUT':
          return 2;
        case 'STOPPED':
          return 3;
        default:
          return 3;
      }
    });
  }, [status]);

  const progressHandler = async (e: MouseEvent<HTMLButtonElement>, idx: number) => {
    const currentStatus = status;
    const selectStatusKey = e.currentTarget.id as FeedStatusType;
    const statusName = dropdownItems[idx].name;
    let desc: string = `상태를 ${statusName}로 변경하시겠어요?`;
    let variant: ButtonVariantType = 'primary';
    const prevIdx = dropdownItems.findIndex((item) => item.id === currentStatus);
    if (currentStatus === selectStatusKey) return;

    if (currentStatus === 'ON_SALE_OR_BUY' && selectStatusKey === 'STOPPED') {
      desc = '거래중지로 변경하시겠어요?\n거래를 중지하면 다른 유저에게 보여지지 않아요.';
      variant = 'primary';
    } else if (currentStatus === 'IN_TRANSACTION' && selectStatusKey === 'SOLD_OUT') {
      desc = '거래완료로 변경하시겠어요?';
      variant = 'primary';
    } else if (currentStatus === 'IN_TRANSACTION' && selectStatusKey === 'STOPPED') {
      desc = '현재 거래중입니다. 거래를 중지하시겠어요?\n거래를 중지하면 다른 유저에게 보여지지 않아요.';
      variant = 'danger';
    } else if (currentStatus === 'IN_TRANSACTION' && selectStatusKey === 'ON_SALE_OR_BUY') {
      desc = '진행 중인 거래를 취소하고 다시 거래 가능한 상태로 변경하시겠어요?';
      variant = 'danger';
    }

    try {
      const result = await confirm({ title: '상태 변경', desc, positiveBtnVariant: variant });
      console.log(result);
      if (result) await editFeedStatus(selectStatusKey);
      else setSelectedIndex(prevIdx);
    } catch (error) {
      console.error(error);
      alert({ title: '거래 상태 변경 실패', desc: '거래 상태 변경에 실패했습니다.' });
      setSelectedIndex(prevIdx);
      feedDetail.status = selectStatusKey;
    }
  };

  const dropdownItems = [
    {
      name: '거래가능',
      id: 'ON_SALE_OR_BUY',
      handler: progressHandler,
    },
    {
      name: '거래중',
      id: 'IN_TRANSACTION',
      handler: progressHandler,
    },
    {
      name: '거래완료',
      id: 'SOLD_OUT',
      handler: progressHandler,
    },
    {
      name: '거래중지',
      id: 'STOPPED',
      handler: progressHandler,
    },
  ];

  return (
    <Wrap className="contents" gap="M">
      <FeedImageSlider imgSrcs={images.map((image) => image.fileUrl)} />
      <Column className="contents" gap="XS">
        <Column className="descContainer" gap="M">
          <Column gap="L">
            <Row justify="between" alignItems="start">
              <Column>
                <Typo tag="p" className="title" type="BODY_LG" weight={800}>
                  {title}
                </Typo>
                <Typo tag="p" className="price" type="BODY_MD">
                  {price.toLocaleString()}원
                </Typo>
              </Column>
              <DropDownMenu items={dropdownItems} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            </Row>
            <Typo tag="p" className="desc" type="BODY_SM">
              {content}
            </Typo>
            <Row className="tagContainer" gap="XS" flex={1} flexWrap="wrap">
              {genreCategory.map((category) => (
                <Tag key={category.categoryId} color="outline" text={category.categoryName} />
              ))}
              {goodsCategory.map((category) => (
                <Tag key={category.categoryId} color="outline" text={category.categoryName} />
              ))}
            </Row>
          </Column>
          <Row className="feedInfo">
            <Typo tag="p" type="CAPTION_MD">
              {/* TODO: api 작업 후 chatCount 추가 */}
              <ChatBubbleLeftRightIcon color={AppSemanticColor.ICON_TERTIARY.hex} width={16} height={16} /> {0}{' '}
              <HeartIcon color={AppSemanticColor.ICON_TERTIARY.hex} width={16} height={16} /> {likeCount}{' '}
              <EyeIcon color={AppSemanticColor.ICON_TERTIARY.hex} width={16} height={16} /> {viewCount}
            </Typo>
          </Row>
          <FeedUser user={userInfo} />
        </Column>
      </Column>
      {userRecommendFeeds && userRecommendFeeds.feeds.length > 1 && (
        <RecommendCard
          title={`${userInfo.nickname}님의 판매 물품`}
          feeds={userRecommendFeeds?.feeds.filter((feed) => feed.feedId !== feedId)}
          align="row"
        />
      )}
      {recommendFeeds && recommendFeeds.feeds.length > 1 && (
        <RecommendCard
          title={`같은 장르 다른 물품`}
          feeds={recommendFeeds?.feeds.filter((feed) => feed.feedId !== feedId)}
          align="row"
        />
      )}
    </Wrap>
  );
};
