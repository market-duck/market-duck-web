import { FeedModel } from '@market-duck/apis/models/feedModel';
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
  feeds: FeedModel[];
}

export const FeedList = ({ feeds }: FeedListProps) => {
  return (
    <Grid>
      {feeds.map((feed) => (
        <Card
          key={feed.feedId}
          title={feed?.title}
          price={feed?.price}
          status={feed.status}
          imgSrc={feed?.mainImageUrl}
          createdAt={feed?.createdAt}
          viewCount={feed?.viewCount}
          likedCount={feed.likeCount}
        />
      ))}
    </Grid>
  );
};
