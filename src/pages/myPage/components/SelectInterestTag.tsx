import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { Select } from '@market-duck/components/Select/Select';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const dummyGenre = [
  '주술회전',
  '원신',
  '봇치 더 록!',
  '장송의 프리렌',
  'SPYxFAMILY',
  '아이돌리쉬 세븐',
  '블루아카이브',
  '하이큐',
  '괴담속에 들어가도 출근은 해야하는구나',
  '데뷔 못하면 죽음',
  '화산귀환',
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
  '쯔무쯔무',
  '파우치',
  '키링',
];

const Container = styled(AppGutter)`
  height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SelectInterestTag = ({ page, onNext }: { page: 'signUp' | 'editUser'; onNext: () => void }) => {
  const [selectedGenreTag, setSelectedGenreTag] = useState<string[]>([]);
  const [selectedCategoryTag, setSelectedCategoryTag] = useState<string[]>([]);

  const showByTagGenreList = dummyGenre.slice(0, 8);
  const showBySelectGenreList = dummyGenre.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const showByTagCategoryList = dummyCategoty.slice(0, 8);
  const showBySelectCategoryList = dummyCategoty.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  //TODO:: Select에 맞게 고쳐야함
  const clickHandler = (type: 'genre' | 'category', item: string) => {
    if (type === 'genre')
      setSelectedGenreTag((prev) =>
        prev.includes(item) ? prev.filter((selectedItem) => item != selectedItem) : [...prev, item],
      );
    else if (type === 'category')
      setSelectedCategoryTag((prev) =>
        prev.includes(item) ? prev.filter((selectedItem) => item != selectedItem) : [...prev, item],
      );
  };

  const isSelectedTags = selectedCategoryTag.length || selectedGenreTag.length;

  const submitHandler = () => {
    onNext();
  };

  return (
    <Container>
      <Column gap="XL">
        <Column gap="M" flex={0}>
          <PageHeading title="홈 화면 구성하기" />
          <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_SECONDARY.color}>
            태그를 선택해 관심사 기반으로 홈 화면을 구성해요.
          </Typo>
        </Column>
        <Column gap="M">
          <Column gap="M" flex={0}>
            <PageHeading title="관심 장르" />
            <Row flexWrap="wrap" gap="XS">
              {showByTagGenreList.map((item) => (
                <Tag
                  key={item}
                  text={item}
                  onClick={() => clickHandler('genre', item)}
                  color={selectedGenreTag.includes(item) ? 'primary' : 'secondary'}
                />
              ))}
            </Row>
            <Select
              selectType="multi"
              value={[]}
              onChangeValue={(selectedValue) => {}}
              placeholder="이외 장르 선택"
              optionList={showBySelectGenreList}
            />
          </Column>
          <Column gap="M" flex={0}>
            <PageHeading title="관심 품목" />
            <Row flexWrap="wrap" gap="XS">
              {showByTagCategoryList.map((item) => (
                <Tag
                  key={item}
                  text={item}
                  onClick={() => clickHandler('category', item)}
                  color={selectedCategoryTag.includes(item) ? 'primary' : 'secondary'}
                />
              ))}
            </Row>
            <Select
              selectType="multi"
              value={[]}
              onChangeValue={(selectedValue) => {}}
              placeholder="이외 태그 선택"
              optionList={showBySelectCategoryList}
            />
          </Column>
        </Column>
      </Column>
      <Column gap="XS" flex={0}>
        <Button disabled={!isSelectedTags} onClick={submitHandler}>
          {page === 'signUp' ? '회원가입 완료' : '구성 완료'}
        </Button>
        <Button onClick={onNext} variant="text">
          건너뛰기
        </Button>
      </Column>
    </Container>
  );
};
