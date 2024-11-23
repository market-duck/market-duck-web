import { FeedModel } from '@market-duck/apis/models/feedModel';
import { Column } from '@market-duck/components/Flex/Flex';
import { FeedList } from '@market-duck/components/List/FeedList';
import { Tag } from '@market-duck/components/Tag/Tag';
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
  }
  .title {
    ${AppTypo.HEADING_SM}
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
        <span className="title">{title}</span>
      </Heading>
      <FeedList feeds={feeds} />
    </Column>
  );
};
