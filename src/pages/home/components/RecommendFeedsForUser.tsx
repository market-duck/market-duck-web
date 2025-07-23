import { feedAPI } from '@market-duck/apis/feedAPI';
import { UserModel } from '@market-duck/apis/models/userModel';
import { Divider } from '@market-duck/components/Divider/Divider';
import { Column } from '@market-duck/components/Flex/Flex';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { RecommendCard } from '@market-duck/pages/home/components/RecommendCard';
import { useQuery } from '@tanstack/react-query';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

export const RecommendFeedsForUser = ({ user }: { user: UserModel }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['home', 'feeds', 'recommend'],
    queryFn: () => feedAPI.getFeeds({ page: 0 }),
  });
  return (
    <Column gap="XL">
      <Typo tag="p" type="HEADING_SM" className={AppSemanticColor.TEXT_PRIMARY.color}>
        👋 반가워요, {user?.nickname}님!
      </Typo>
      {!isLoading && data && (
        <>
          <div>
            <Typo tag="span" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_SECONDARY.color}>
              {user.nickname}님이 좋아하는 <Tag text="주술회전" color="secondary" /> 의
            </Typo>
            <RecommendCard feeds={data?.feeds} title="최근 피드" />
          </div>
          <Divider />
          <div>
            <Typo tag="span" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_SECONDARY.color}>
              {user.nickname}님이 좋아하는 <Tag text="주술회전" color="secondary" /> 의
            </Typo>
            <RecommendCard feeds={data.feeds} title="인기 피드" />
          </div>
          <Divider />
          <div>
            <Typo tag="span" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_SECONDARY.color}>
              {user.nickname}님이 좋아하는 <Tag text="주술회전" color="secondary" /> 의
            </Typo>
            <RecommendCard feeds={data.feeds} title="최근 피드" />
          </div>

          <Divider />
          <div>
            <Typo tag="span" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_SECONDARY.color}>
              {user.nickname}님이 좋아하는 <Tag text="주술회전" color="secondary" /> 의
            </Typo>
            <RecommendCard feeds={data.feeds} title="인기 피드" />
          </div>
        </>
      )}
    </Column>
  );
};
