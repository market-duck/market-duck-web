import { feedAPI } from '@market-duck/apis/feedAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { FeedBottomBtns } from '@market-duck/pages/feed/components/FeedBottomBtns';
import { FeedContent } from '@market-duck/pages/feed/components/FeedContent';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  // TODO: 클라이언트에서 가지고 있는 유저 정보(id)와 게시글의 userId를 비교해 내 글일때 핸들링 필요(버튼 핸들러 및 드롭다운 등)

  const user = useRecoilValue(userDataAtom);
  const params = useParams();
  const feedId = Number(params.feedId);
  const { data: feedDetail } = useQuery({
    queryKey: ['feed', 'read', feedId],
    queryFn: () => feedAPI.getFeedDetail({ feedId }),
  });
  const [isMyFeed, setIsMyFeed] = useState<null | boolean>(null);

  useEffect(() => {
    setIsMyFeed(false);
    // setIsMyFeed(feedDetail?.userInfo.userId === user?.userId);
  }, [feedDetail, user]);

  return (
    <>
      <NavigationTop title="피드" leftButtonIconType="back" />
      <Wrap>{feedDetail && <FeedContent feedDetail={feedDetail} />}</Wrap>
      {isMyFeed !== null && <FeedBottomBtns isMyFeed={isMyFeed} />}
    </>
  );
};
