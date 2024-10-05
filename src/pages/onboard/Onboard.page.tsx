import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const Container = styled(AppGutter)`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Onboard = () => {
  const [selectedAnimeTag, setSelectedAnimeTag] = useState<string[]>([]);
  const [selectedCategoryTag, setSelectedCategoryTag] = useState<string[]>([]);

  const dummyAnime = [
    '주술회전',
    '원신',
    '봇치 더 록!',
    '장송의 프리렌',
    'SPYxFAMILY',
    '아이돌리쉬 세븐',
    '블루아카이브',
  ];
  const dummyCategoty = [
    '아크릴 스탠드',
    '마스코트',
    '피규어',
    '브로마이드*카드',
    '스트랩*키홀더',
    '뱃지류',
    '문구*데스크용품',
    '클리어파일',
  ];

  const clickHandler = (type: 'anime' | 'category', item: string) => {
    if (type === 'anime')
      setSelectedAnimeTag((prev) =>
        prev.includes(item) ? prev.filter((selectedItem) => item != selectedItem) : [...prev, item],
      );
    else if (type === 'category')
      setSelectedCategoryTag((prev) =>
        prev.includes(item) ? prev.filter((selectedItem) => item != selectedItem) : [...prev, item],
      );
  };

  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="온보딩" />
      <Container>
        <Column gap="XL" flex={0}>
          <Column gap="M" flex={0}>
            <PageHeading title="홈 화면 구성하기" />
            <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_SECONDARY.color}>
              태그를 선택해 관심사 기반으로 홈 화면을 구성해요.
            </Typo>
          </Column>
          <Column gap="XS" flex={0}>
            <PageHeading title="주요 애니메이션" />
            <Row flexWrap="wrap" gap="XS">
              {dummyAnime.map((item) => (
                <Tag
                  key={item}
                  text={item}
                  onClick={() => clickHandler('anime', item)}
                  color={selectedAnimeTag.includes(item) ? 'primary' : 'secondary'}
                />
              ))}
            </Row>
          </Column>
          <Column gap="XS" flex={0}>
            <PageHeading title="주요 품목" />
            <Row flexWrap="wrap" gap="XS">
              {dummyCategoty.map((item) => (
                <Tag
                  key={item}
                  text={item}
                  onClick={() => clickHandler('category', item)}
                  color={selectedCategoryTag.includes(item) ? 'primary' : 'secondary'}
                />
              ))}
            </Row>
          </Column>
        </Column>
        <Row className="btnContainer" flex={0} gap="XS">
          <Button size="medium" onClick={() => console.log('건너뛰기')} row variant="secondary">
            건너뛰기
          </Button>
          <Button size="medium" onClick={() => console.log('선택 완료')} row variant="primary">
            선택 완료
          </Button>
        </Row>
      </Container>
    </>
  );
};
