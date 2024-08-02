import { alignItemsCenter, Column, justifyBetween, Row } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { FeedImageSlider } from '@market-duck/pages/feed/components/FeedImageSlider';
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
  // TODO: DrowDown 추가하여 작업 필요
  return (
    <Wrap className="contents" gap="M">
      <Row justify={justifyBetween} alignItems={alignItemsCenter} className="feedAuthorContainer">
        <Row gap="XS" alignItems={alignItemsCenter} flex={1}>
          <Thumbnail size="md" imgSrc="https://placehold.co/400" />
          <Column flex={1}>
            <Typo className="user" type="BODY_SM">
              단단무지 님
            </Typo>
            <Typo className="twitterId" type="CAPTION_SM">
              @트위터
            </Typo>
          </Column>
        </Row>
        {/* DrowDown */}
      </Row>
      <FeedImageSlider imgSrcs={['https://placehold.co/500x400', 'https://placehold.co/400']} />
      <Column className="contents" gap="XXS">
        <Typo className="feedInfo" type="CAPTION_SM">
          1시간 전 조회수 0 찜 0
        </Typo>
        <Row className="tagContainer" gap="XS">
          <Tag color="secondary" text="앙상블 스타즈!!" /> <Tag color="secondary" text="누이" />
        </Row>
        <Column className="descContainer" gap="XXS">
          <Typo className="title" type="BODY_LG">
            앙스타 누이
          </Typo>
          <Typo className="price" type="BODY_LG">
            {(100000).toLocaleString()}원
          </Typo>
          <Typo
            className="desc"
            type="BODY_MD"
          >{`자세한건 사진 참고해주세요\nA 가져가시는 분은 +B 데려가주셔야 합니다 \n사용감O 합배송O\nGS 반값택배 사용 `}</Typo>
        </Column>
      </Column>
    </Wrap>
  );
};
