import { FeedModel } from '@market-duck/apis/models/feedModel';
import { Card } from '@market-duck/components/Card/Card';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Grid = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  gap: ${AppSpacing.XS};
`;

const RowList = styled.ul`
  display: flex;
  width: 100%;
  overflow-x: auto;
  gap: ${AppSpacing.XS};
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  > div {
    min-width: calc(50% - ${AppSpacing.XS} / 2);
    width: calc(50% - ${AppSpacing.XS} / 2);
  }
`;

interface FeedListProps {
  feeds: FeedModel[];
  align?: 'grid' | 'row';
}

export const FeedList = ({ feeds, align = 'grid' }: FeedListProps) => {
  return align === 'grid' ? (
    <Grid>
      {feeds.map((feed) => (
        <Card
          key={feed.feedId}
          id={feed.feedId}
          title={feed?.title}
          price={feed?.price}
          status={feed.status}
          imgSrc={feed?.mainImageUrl}
          createdAt={feed?.createdAt}
          viewCount={feed?.viewCount}
          likedCount={feed.likeCount}
          liked={feed.liked}
          tagList={[
            ...(feed?.genreCategory.map((item) => item.categoryName) || []),
            ...(feed?.goodsCategory.map((item) => item.categoryName) || []),
          ]}
          chatCount={0} //TODO: API 사양 변경 후 수정 필요
        />
      ))}
    </Grid>
  ) : (
    <RowList>
      {feeds.map((feed) => (
        <Card
          key={feed.feedId}
          id={feed.feedId}
          title={feed?.title}
          price={feed?.price}
          status={feed.status}
          imgSrc={feed?.mainImageUrl}
          createdAt={feed?.createdAt}
          viewCount={feed?.viewCount}
          likedCount={feed.likeCount}
          liked={feed.liked}
          tagList={[
            ...(feed?.genreCategory.map((item) => item.categoryName) || []),
            ...(feed?.goodsCategory.map((item) => item.categoryName) || []),
          ]}
          chatCount={0} //TODO: API 사양 변경 후 수정 필요
        />
      ))}
    </RowList>
  );
};
