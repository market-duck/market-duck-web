import { CategoryModel } from '@market-duck/apis/models/categoryModel';
import { UserModel } from '@market-duck/apis/models/userModel';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { SearchCategory } from '@market-duck/components/SearchCategory/SearchCategory';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { EditUserType } from '@market-duck/types/user';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
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
  min-height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface SelectInterestTagProps {
  page: 'signUp' | 'editUser';
  onNext: () => void;
  mutate: UseMutateAsyncFunction<UserModel | undefined, Error, EditUserType, unknown>;
}

export const SelectInterestTag = ({ page, onNext, mutate }: SelectInterestTagProps) => {
  const [selectedGenreTag, setSelectedGenreTag] = useState<CategoryModel[]>([]);
  const [selectedGoodsTag, setSelectedGoodsTag] = useState<CategoryModel[]>([]);

  const showByTagGenreList = dummyGenre.slice(0, 8);
  const showByTagCategoryList = dummyCategoty.slice(0, 8);

  const isSelectedTags = selectedGoodsTag.length || selectedGenreTag.length;

  const submitHandler = async () => {
    const genreCategory = selectedGenreTag.map((category) => category.categoryId);
    const goodsCategory = selectedGoodsTag.map((category) => category.categoryId);

    console.log(genreCategory, goodsCategory);
    await mutate({
      genreCategory,
      goodsCategory,
    });
    onNext();
  };

  // TODO: 추천 카테고리 API 추가 시 반영 필요

  return (
    <Container>
      <Column gap="M">
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
                    onClick={() => {}}
                    // color={selectedGenreTag.includes(item) ? 'primary' : 'secondary'}
                  />
                ))}
              </Row>
              <SearchCategory
                selecteds={selectedGenreTag}
                changeSelectedsHandler={(value) => setSelectedGenreTag(value)}
                categoryType="GENRE"
                isError={false}
                placeholder="관심 장르 검색"
              />
            </Column>
            <Column gap="M" flex={0}>
              <PageHeading title="관심 품목" />
              <Row flexWrap="wrap" gap="XS">
                {showByTagCategoryList.map((item) => (
                  <Tag
                    key={item}
                    text={item}
                    onClick={() => {}}
                    // color={selectedCategoryTag.includes(item) ? 'primary' : 'secondary'}
                  />
                ))}
              </Row>
              <SearchCategory
                selecteds={selectedGoodsTag}
                changeSelectedsHandler={(value) => setSelectedGoodsTag(value)}
                categoryType="GOODS"
                isError={false}
                placeholder="관심 품목 검색"
              />
            </Column>
          </Column>
        </Column>
        <Column gap="XS" flex={0}>
          <Button disabled={!isSelectedTags} onClick={submitHandler}>
            {page === 'signUp' ? '회원가입 완료' : '구성 완료'}
          </Button>
          {page === 'signUp' && (
            <Button onClick={onNext} variant="text">
              건너뛰기
            </Button>
          )}
        </Column>
      </Column>
    </Container>
  );
};
