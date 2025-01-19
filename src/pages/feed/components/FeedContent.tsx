import { feedAPI } from '@market-duck/apis/feedAPI';
import { FeedDetailModel } from '@market-duck/apis/models/feedModel';
import { DropDownMenu } from '@market-duck/components/DropDownMenu/DropDownMenu';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { FeedImageSlider } from '@market-duck/pages/feed/components/FeedImageSlider';
import { FeedStatusType } from '@market-duck/types/feed';
import { getTimeDiff } from '@market-duck/utils/date';
import { useMutation } from '@tanstack/react-query';
import { MouseEvent, useEffect, useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Wrap = styled(Column)`
  padding: ${AppSpcing.M} 0;
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
      margin-top: ${AppSpcing.XXS};
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
  const { mutateAsync } = useMutation({
    mutationKey: ['feed', 'update', feedId],
    mutationFn: async (progress: FeedStatusType) => {
      await feedAPI.editFeedStatus({ feedId, feedStatus: progress });
    },
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
        default:
          return 2;
      }
    });
  }, []);

  const progressHandler = async (e: MouseEvent<HTMLButtonElement>, idx: number) => {
    const currentStatus = status;
    const selectStatusKey = e.currentTarget.id as FeedStatusType;
    const statusName = dropdownItems[idx].name;

    try {
      const result = await confirm({ title: '상태 변경', desc: `${statusName}으로 변경하시겠어요?` });
      if (result) await mutateAsync(selectStatusKey);
    } catch (error) {
      console.error(error);
      alert({ title: '거래 상태 변경 실패', desc: '거래 상태 변경에 실패했습니다.' });
      const prevIdx = dropdownItems.findIndex((item) => item.id === currentStatus);
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
  ];

  return (
    <Wrap className="contents" gap="M">
      <Row justify="between" alignItems="center" className="feedAuthorContainer">
        <Row gap="XS" alignItems="center" flex={1}>
          <Thumbnail size="md" imgSrc={userInfo.profileImageUrl} />
          <Column flex={1} alignItems="center">
            <Typo tag="p" className="user" type="BODY_SM">
              {userInfo.nickname}
            </Typo>
          </Column>
        </Row>
        <DropDownMenu
          items={dropdownItems}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          disabled={!isMyFeed}
        />
      </Row>
      <FeedImageSlider imgSrcs={images.map((image) => image.fileUrl)} />
      <Column className="contents" gap="XXS">
        <Typo tag="p" className="feedInfo" type="CAPTION_SM">
          {relativeTime} 조회수 {viewCount} 찜 {likeCount}
        </Typo>
        <Row className="tagContainer" gap="XS">
          {genreCategory.map((category) => (
            <Tag color="secondary" text={category.categoryName} />
          ))}
          {goodsCategory.map((category) => (
            <Tag color="secondary" text={category.categoryName} />
          ))}
        </Row>
        <Column className="descContainer" gap="XS">
          <Typo tag="p" className="title" type="BODY_LG">
            {title}
          </Typo>
          <Typo tag="p" className="price" type="BODY_LG">
            {price.toLocaleString()}원
          </Typo>
          <Typo tag="p" className="desc" type="BODY_MD">
            {content}
          </Typo>
        </Column>
      </Column>
    </Wrap>
  );
};
