import { ChatBubbleLeftRightIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { BgImage } from '@market-duck/components/Image/BgImage';
import { StatusTag, StatusTagColorType } from '@market-duck/components/Tag/StatusTag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useSingleImageValidation } from '@market-duck/hooks/useImageValidation';
import { FeedStatusType } from '@market-duck/types/feed';
import { Link } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled, { css } from 'styled-components';

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
    overflow: hidden;

    > .status-tag {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
    }

    > .likeIcon {
      position: absolute;
      bottom: ${AppSpacing.XS};
      right: ${AppSpacing.XS};
      width: 1.5rem;
      height: 1.5rem;
      stroke: ${AppSemanticColor.ICON_INVERSE.hex};
      fill: rgba(79, 79, 79, 0.32);
      &.liked {
        fill: ${AppSemanticColor.ICON_INVERSE.hex};
      }
    }

    > .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
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

const ItemImg = styled(BgImage)<{ $status: FeedStatusType }>`
  background-size: cover;
  width: 100%;
  aspect-ratio: 1/1;
  margin-bottom: ${AppSpacing.XXS};
  border-radius: ${AppRadii.L};
  position: relative;
  overflow: hidden;
  ${({ $status }) =>
    $status === 'SOLD_OUT' &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
      }
    `}
`;

const InfoBox = styled(Column)`
  ${AppTypo.BODY_SM};
  color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  gap: ${AppSpacing.XXS};
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
  liked,
  chatCount,
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
  liked: boolean;
  chatCount: number;
}) => {
  const statusWord = getStatusWord(status);
  const validImage = useSingleImageValidation(imgSrc);

  return (
    <CardWrap>
      <div className="image">
        <Link to={`/feed/read/${id}`} state={{ liked }}>
          <ItemImg $src={validImage} $status={status} />
        </Link>
        <HeartIcon className={`likeIcon ${liked ? 'liked' : ''}`} />
        <StatusTag className="status-tag" text={statusWord.text} color={statusWord.color as StatusTagColorType} />
      </div>
      <InfoBox>
        <Row gap="XXS">
          {tagList &&
            tagList.map((item) => {
              return <StatusTag key={item} text={item} color="neutral" />;
            })}
        </Row>
        <Link to={`/feed/read/${id}`} state={{ liked }}>
          <Typo tag="p" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_PRIMARY.color}>
            {title}
          </Typo>
        </Link>
        <Typo tag="p" type="CAPTION_MD" weight={400} className={AppSemanticColor.TEXT_SECONDARY.color}>
          {price.toLocaleString()}원
        </Typo>
        <Row className="bottom-info" gap="XXS" justify="start" alignItems="center">
          <Row gap="XXXS" alignItems="center">
            <ChatBubbleLeftRightIcon />
            {chatCount}
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
