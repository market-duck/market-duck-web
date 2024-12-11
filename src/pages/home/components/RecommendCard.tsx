import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { FeedModel } from '@market-duck/apis/models/feedModel';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { FeedList } from '@market-duck/components/List/FeedList';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const Heading = styled.h4`
  display: flex;
  flex-direction: column;
  margin-bottom: ${AppSpcing.XS};
  .desc {
    font-weight: 600;
    ${AppTypo.BODY_SM}
    color: ${AppSemanticColor.TEXT_SECONDARY.hex}
  }
`;

interface CardSelectionProps {
  title: string;
  feeds: FeedModel[];
  tag: string;
  nickName: string;
}

export const RecommendCard = ({ nickName, title, feeds, tag }: CardSelectionProps) => {
  return (
    <Column>
      <Heading>
        <span className="desc">
          {nickName}님이 좋아하는 <Tag text={tag} color="secondary" /> 의
        </span>
        <Row justify="between" className="title">
          <Typo tag="h3" type="HEADING_SM">
            {title}
          </Typo>
          <ChevronRightIcon color={AppSemanticColor.ICON_PRIMARY.hex} />
        </Row>
      </Heading>
      <FeedList feeds={feeds} />
    </Column>
  );
};
