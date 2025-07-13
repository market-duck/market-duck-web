import { feedAPI } from '@market-duck/apis/feedAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { FeedBottomBtns, MyFeedBottomBtns } from '@market-duck/pages/feed/components/FeedBottomBtns';
import { FeedContent } from '@market-duck/pages/feed/components/FeedContent';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Wrap = styled(AppGutter)`
  position: relative;
  display: flex;
  flex-direction: column;
  .btnContainer {
  }
`;

export const Read = () => {
  const user = useRecoilValue(userDataAtom);
  const params = useParams();
  const { state } = useLocation();
  const feedId = Number(params.feedId);
  const { data: feedDetail } = useQuery({
    queryKey: ['feed', 'read', feedId],
    queryFn: () => feedAPI.getFeedDetail({ feedId, liked: state?.liked }),
  });
  const isMyFeed = feedDetail?.userInfo.userId === user?.userId;

  return (
    <>
      <NavigationTop title="" leftButtonIconType="back" />
      <Wrap>{feedDetail && <FeedContent feedDetail={feedDetail} isMyFeed={isMyFeed} />}</Wrap>
      {feedDetail &&
        (isMyFeed ? <MyFeedBottomBtns feedDetail={feedDetail} /> : <FeedBottomBtns feedDetail={feedDetail} />)}
    </>
  );
};
