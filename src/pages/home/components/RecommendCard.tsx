import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { FeedModel } from '@market-duck/apis/models/feedModel';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { FeedList } from '@market-duck/components/List/FeedList';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Heading = styled.h4`
  display: flex;
  flex-direction: column;
  margin-bottom: ${AppSpacing.XS};
`;

interface CardSelectionProps {
  title: string;
  feeds: FeedModel[];
  align?: 'grid' | 'row';
}

export const RecommendCard = ({ title, feeds, align = 'grid' }: CardSelectionProps) => {
  return (
    <Column>
      <Heading>
        <Row justify="between" className="title">
          <Typo tag="h3" type="HEADING_SM">
            {title}
          </Typo>
          <ChevronRightIcon color={AppSemanticColor.ICON_PRIMARY.hex} width={24} />
        </Row>
      </Heading>
      <FeedList feeds={feeds} align={align} />
    </Column>
  );
};
