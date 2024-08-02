import { Card } from '@market-duck/components/Card/Card';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Grid = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: ${AppSpcing.XS};
`;

interface FeedListProps {
  feeds: any; //TODO: 차후 feed model type으로 변경
}

export const FeedList = ({ feeds }: FeedListProps) => {
  return (
    <Grid>
      {feeds.map((feed: any) => (
        <Card
          key={feed?.id}
          title={feed?.title}
          price={feed?.price}
          status="possible" // TODO: 차후 feed?.status로 변경
          imgSrc={feed?.imgSrc}
          createdAt={feed?.createdAt}
          viewCount={feed?.viewCount}
          likedCount={feed?.likedCount}
        />
      ))}
    </Grid>
  );
};
