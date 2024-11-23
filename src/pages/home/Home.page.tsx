import { feedAPI } from '@market-duck/apis/feedAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Column } from '@market-duck/components/Flex/Flex';
import { FeedList } from '@market-duck/components/List/FeedList';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Typo } from '@market-duck/components/Typo/Typo';
import { RecommendFeedsForUser } from '@market-duck/pages/home/components/RecommendFeedsForUser';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

export const Home = () => {
  const user = useRecoilValue(userDataAtom);

  // TODO: page, infinityQuery 적용 필요
  const { data } = useQuery({
    queryKey: ['home', 'feeds'],
    queryFn: () => feedAPI.getFeeds({ page: 0 }),
    enabled: !user,
  });

  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="홈" />
      <AppGutter>
        <Column gap="XL">
          {user ? <RecommendFeedsForUser user={user} /> : data && <FeedList feeds={data?.feeds} />}
          <Typo tag="p" type="CAPTION_SM" className={AppSemanticColor.TEXT_PRIMARY.color}>
            copyright @팀마켓덕
          </Typo>
        </Column>
      </AppGutter>
    </>
  );
};
