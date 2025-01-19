import { ChatBubbleLeftRightIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { BgImage } from '@market-duck/components/Image/BgImage';
import { StatusTag, StatusTagColorType } from '@market-duck/components/Tag/StatusTag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { FeedStatusType } from '@market-duck/types/feed';
import { getTimeDiff } from '@market-duck/utils/date';
import { Link } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

function getStatusWord(status: FeedStatusType) {
  switch (status) {
    case 'ON_SALE_OR_BUY':
      return { text: '거래가능', color: 'green' };
    case 'IN_TRANSACTION':
      return { text: '거래중', color: 'blue' };
    case 'SOLD_OUT':
      return { text: '거래완료', color: 'neutral' };
    default:
      return { text: '', color: '' };
  }
}

const CardWrap = styled(Column)`
  > .image {
    position: relative;

    > .status-tag {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
    }
  }

  .bottom-info {
    color: ${AppSemanticColor.TEXT_TERTIARY.hex};
    font-weight: 500;
    ${AppTypo.CAPTION_SM};
    svg {
      width: 12px;
      height: 12px;
      color: ${AppSemanticColor.ICON_TERTIARY.hex};
    }
  }
`;

const ItemImg = styled(BgImage)`
  background-size: cover;
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: ${AppSpcing.XXS};
  border-radius: ${AppRadii.L};
`;

const InfoBox = styled(Column)`
  ${AppTypo.BODY_SM};
  color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  gap: ${AppSpcing.XXS};
`;

export const Card = ({
  id,
  title,
  price,
  imgSrc,
  tagList,
  status,
  createdAt,
  viewCount,
  likedCount,
}: {
  id: number;
  title: string;
  price: number;
  imgSrc?: string;
  tagList?: Array<string>;
  status: FeedStatusType;
  createdAt: Date;
  viewCount: number;
  likedCount: number;
}) => {
  //TODO:: 추후 시간으로 formatting 필요; (아마 시간, 분, 초 등 단위 다양화 할 수도 있음)
  const relativeTime = getTimeDiff(createdAt);

  const statusWord = getStatusWord(status);

  return (
    <CardWrap>
      <div className="image">
        {/* TODO:: 추후 default img src 연결 */}
        {imgSrc && (
          <Link to={`/feed/read/${id}`}>
            <ItemImg $src={imgSrc} />
          </Link>
        )}
        <StatusTag className="status-tag" text={statusWord.text} color={statusWord.color as StatusTagColorType} />
      </div>
      <InfoBox>
        <Row gap="XXS">
          {tagList &&
            tagList.map((item) => {
              return <StatusTag key={item} text={item} color="neutral" />;
            })}
        </Row>
        <Link to={`/feed/read/${id}`}>
          <Typo tag="p" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_PRIMARY.color}>
            {title}
          </Typo>
        </Link>
        <Typo tag="p" type="CAPTION_MD" weight={400} className={AppSemanticColor.TEXT_SECONDARY.color}>
          {price}원
        </Typo>
        <Row className="bottom-info" gap="XXS" justify="start" alignItems="center">
          <Row gap="XXXS" alignItems="center">
            <ChatBubbleLeftRightIcon />
            {relativeTime}
          </Row>
          <Row gap="XXXS" alignItems="center">
            <HeartIcon />
            {likedCount}
          </Row>
          <Row gap="XXXS" alignItems="center">
            <EyeIcon />
            {viewCount}
          </Row>
        </Row>
      </InfoBox>
    </CardWrap>
  );
};
