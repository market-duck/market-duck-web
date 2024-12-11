import { feedAPI } from '@market-duck/apis/feedAPI';
import { UserModel } from '@market-duck/apis/models/userModel';
import { Column } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { RecommendCard } from '@market-duck/pages/home/components/RecommendCard';
import { useQuery } from '@tanstack/react-query';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${AppSemanticColor.BG_SECONDARY.hex};
`;

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
          <RecommendCard feeds={data?.feeds} title="최근 피드" tag="주술회전" nickName={user?.nickname} />
          <Divider />
          <RecommendCard feeds={data.feeds} title="인기 피드" tag="주술회전" nickName={user?.nickname} />
          <Divider />
          <RecommendCard feeds={data.feeds} title="최근 피드" tag="아크릴 스탠드" nickName={user?.nickname} />
          <Divider />
          <RecommendCard feeds={data.feeds} title="인기 피드" tag="아크릴 스탠드" nickName={user?.nickname} />
        </>
      )}
    </Column>
  );
};
