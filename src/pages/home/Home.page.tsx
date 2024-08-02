import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Column } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { CardRecommend } from '@market-duck/pages/home/components/CardRecommend';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

export const Home = () => {
  const dummyNickName = '단단무지';
  const feedDummy = {
    title: 'title',
    price: 999,
    tagList: ['tag1', 'tag2'],
    status: 'possible',
    createdAt: new Date(),
    viewCount: 9,
    likedCount: 9,
    imgSrc: 'https://placehold.co/400',
  };
  const dummyFeeds = new Array(2).fill(feedDummy).map((item, idx) => ({ ...item, id: idx }));
  return (
    <AppGutter $padding="16px">
      <Column gap="XL">
        <Typo tag="p" type="HEADING_SM" className={AppSemanticColor.TEXT_PRIMARY.color}>
          반가워요, {dummyNickName}님!
        </Typo>
        <CardRecommend feeds={dummyFeeds} title="최근 피드" tag="주술회전" nickName={dummyNickName} />
        <CardRecommend feeds={dummyFeeds} title="인기 피드" tag="주술회전" nickName={dummyNickName} />
        <CardRecommend feeds={dummyFeeds} title="최근 피드" tag="아크릴 스탠드" nickName={dummyNickName} />
        <CardRecommend feeds={dummyFeeds} title="인기 피드" tag="아크릴 스탠드" nickName={dummyNickName} />
        <Typo tag="p" type="CAPTION_SM" className={AppSemanticColor.TEXT_PRIMARY.color}>
          copyright @팀마켓덕
        </Typo>
      </Column>
    </AppGutter>
  );
};
