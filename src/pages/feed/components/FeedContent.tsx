import { DropDownMenu } from '@market-duck/components/DropDownMenu/DropDownMenu';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { FeedImageSlider } from '@market-duck/pages/feed/components/FeedImageSlider';
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

export const FeedContent = () => {
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
          <Thumbnail size="md" imgSrc="https://placehold.co/400" />
          <Column flex={1}>
            <Typo tag="p" className="user" type="BODY_SM">
              단단무지 님
            </Typo>
            <Typo tag="p" className="twitterId" type="CAPTION_SM">
              @트위터
            </Typo>
          </Column>
        </Row>
        <DropDownMenu items={dropdownItems} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </Row>
      <FeedImageSlider imgSrcs={['https://placehold.co/500x400', 'https://placehold.co/400']} />
      <Column className="contents" gap="XXS">
        <Typo tag="p" className="feedInfo" type="CAPTION_SM">
          1시간 전 조회수 0 찜 0
        </Typo>
        <Row className="tagContainer" gap="XS">
          <Tag color="secondary" text="앙상블 스타즈!!" /> <Tag color="secondary" text="누이" />
        </Row>
        <Column className="descContainer" gap="XXS">
          <Typo tag="p" className="title" type="BODY_LG">
            앙스타 누이
          </Typo>
          <Typo tag="p" className="price" type="BODY_LG">
            {(100000).toLocaleString()}원
          </Typo>
          <Typo
            tag="p"
            className="desc"
            type="BODY_MD"
          >{`자세한건 사진 참고해주세요\nA 가져가시는 분은 +B 데려가주셔야 합니다 \n사용감O 합배송O\nGS 반값택배 사용 `}</Typo>
        </Column>
      </Column>
    </Wrap>
  );
};
