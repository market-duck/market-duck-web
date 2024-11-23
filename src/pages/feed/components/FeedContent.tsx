import { FeedDetailModel } from '@market-duck/apis/models/feedModel';
import { DropDownMenu } from '@market-duck/components/DropDownMenu/DropDownMenu';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { FeedImageSlider } from '@market-duck/pages/feed/components/FeedImageSlider';
import { getTimeDiff } from '@market-duck/utils/date';
import { useState } from 'react';
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

export const FeedContent = ({ feedDetail }: { feedDetail: FeedDetailModel }) => {
  const relativeTime = getTimeDiff(feedDetail.createdAt);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownItems = [
    {
      name: '거래중',
      id: 'inProgress',
      handler: () => console.log('inProgress'),
    },
    {
      name: '거래완료',
      id: 'completed',
      handler: () => console.log('completed'),
    },
    {
      name: '거래가능',
      id: 'available',
      handler: () => console.log('available'),
    },
  ];

  return (
    <Wrap className="contents" gap="M">
      <Row justify="between" alignItems="center" className="feedAuthorContainer">
        <Row gap="XS" alignItems="center" flex={1}>
          <Thumbnail size="md" imgSrc={feedDetail.userInfo.profileImageUrl} />
          <Column flex={1}>
            <Typo tag="p" className="user" type="BODY_SM">
              {feedDetail.userInfo.nickname}
            </Typo>
            <Typo tag="p" className="twitterId" type="CAPTION_SM">
              @트위터
            </Typo>
          </Column>
        </Row>
        <DropDownMenu items={dropdownItems} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </Row>
      <FeedImageSlider imgSrcs={feedDetail.images.map((image) => image.fileUrl)} />
      <Column className="contents" gap="XXS">
        <Typo tag="p" className="feedInfo" type="CAPTION_SM">
          {relativeTime} 조회수 {feedDetail.viewCount} 찜 {feedDetail.likeCount}
        </Typo>
        <Row className="tagContainer" gap="XS">
          {feedDetail.genreCategory.map((category) => (
            <Tag color="secondary" text={category.categoryName} />
          ))}
          {feedDetail.goodsCategory.map((category) => (
            <Tag color="secondary" text={category.categoryName} />
          ))}
        </Row>
        <Column className="descContainer" gap="XXS">
          <Typo tag="p" className="title" type="BODY_LG">
            {feedDetail.title}
          </Typo>
          <Typo tag="p" className="price" type="BODY_LG">
            {feedDetail.price.toLocaleString()}원
          </Typo>
          <Typo tag="p" className="desc" type="BODY_MD">
            {feedDetail.content}
          </Typo>
        </Column>
      </Column>
    </Wrap>
  );
};
