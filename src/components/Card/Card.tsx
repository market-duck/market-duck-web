import { Column, Row, alignItemsCenter, justifyEnd } from '@market-duck/components/Flex/Flex';
import { BgImage } from '@market-duck/components/Image/BgImage';
import { StatusTag, StatusTagColorType } from '@market-duck/components/Tag/StatusTag';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

type StatusType = 'possible' | 'processing' | 'completed';

function getStatusWord(status: StatusType) {
  switch (status) {
    case 'possible':
      return { text: '거래가능', color: 'green' };
    case 'processing':
      return { text: '거래중', color: 'blue' };
    case 'completed':
      return { text: '거래완료', color: 'neutral' };
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
  }
`;

const ItemImg = styled(BgImage)`
  background-size: contain;
  width: 10.4rem;
  height: 10.4rem;
  margin-bottom: ${AppSpcing.XXS};
  border-radius: ${AppRadii.L};
`;

const InfoBox = styled(Column)`
  ${AppTypo.BODY_SM};
  color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  gap: ${AppSpcing.XXS};

  .tag-list {
    gap: ${AppSpcing.XXS};
  }

  .title {
    font-weight: 500;
  }

  .price {
    font-weight: 600;
  }
`;

export const Card = ({
  title,
  price,
  imgSrc,
  tagList,
  status,
  createdAt,
  viewCount,
  likedCount,
}: {
  title: string;
  price: number;
  imgSrc?: string;
  tagList?: Array<string>;
  status: StatusType;
  createdAt: Date;
  viewCount: number;
  likedCount: number;
}) => {
  //TODO:: 추후 시간으로 formatting 필요; (아마 시간, 분, 초 등 단위 다양화 할 수도 있음)
  const lastViewed = createdAt;

  const statusWord = getStatusWord(status);

  return (
    <CardWrap>
      <div className="image">
        {/* TODO:: 추후 default img src 연결 */}
        {imgSrc && <ItemImg $src={imgSrc} />}
        <StatusTag className="status-tag" text={statusWord.text} color={statusWord.color as StatusTagColorType} />
      </div>
      <InfoBox>
        <Row className="tag-list">
          {tagList &&
            tagList.map((item) => {
              return <StatusTag key={item} text={item} color="neutral" />;
            })}
        </Row>
        <p className="title">{title}</p>
        <p className="price">{price}원</p>
        <Row className="bottom-info" gap="XXS" justify={justifyEnd} alignItems={alignItemsCenter}>
          <span>1시간 전</span>
          <span>조회수 {viewCount}</span>
          <span>찜 {likedCount}</span>
        </Row>
      </InfoBox>
    </CardWrap>
  );
};
