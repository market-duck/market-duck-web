import styled from 'styled-components';
import { Input } from '@market-duck/components/Form/Input';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { Select } from '@market-duck/components/Select/Select';
import { FeedImageUpload } from './FeedImageUpload';
import { Tab } from '@market-duck/components/Tab/Tab';
import { useEffect, useRef, useState } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { SelectOption } from '@market-duck/components/Select/Select';
import { thousandComma } from '@market-duck/utils/price';
import { BottomSheet, BottomSheetHandle } from '@market-duck/components/Dialog/BottomSheet';
import { SearchSelect } from '@market-duck/pages/feed/components/SearchSelect';

//TODO :: 결과값 없을 때 empty ui 필요

//TODO :: api data로 변경 예정
const genreDummySearch = [
  { value: '주술회전' },
  { value: '하이큐!!' },
  { value: '장송의 프리렌' },
  { value: '던전밥' },
  { value: '슬램덩크' },
  { value: '봇치 더 록!' },
  { value: '앙상블 스타즈!!' },
];

//TODO :: api data로 변경 예정
const goodsDummySearch = [{ value: '피규어' }, { value: '넨도로이드' }, { value: '쯔무쯔무' }];

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${AppSpcing.M};
`;

export const FeedForm = ({
  type = 'create',
  initialValue,
}: {
  type?: 'create' | 'edit';
  initialValue?: {
    genre: Array<SelectOption>;
    goods: Array<SelectOption>;
    title: string;
    price: number;
    content: string;
  };
}) => {
  const [genre, setGenre] = useState<Array<SelectOption>>([]);
  const [goods, setGoods] = useState<Array<SelectOption>>([]);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const genreDialogRef = useRef<BottomSheetHandle>(null);
  const goodsDialogRef = useRef<BottomSheetHandle>(null);

  const handleGenreClick = () => {
    if (genreDialogRef.current) {
      genreDialogRef.current.open();
    }
  };

  const handleGoodsClick = () => {
    if (goodsDialogRef.current) {
      goodsDialogRef.current.open();
    }
  };

  useEffect(() => {
    if (type === 'edit' && initialValue) {
      setGenre(initialValue.genre);
      setGoods(initialValue.goods);
      setTitle(initialValue.title);
      setContent(initialValue.content);
      setPrice(thousandComma(initialValue.price));
    }
  }, []);

  return (
    <FormContainer>
      <Tab
        tabList={[
          {
            id: 'sell',
            name: '판매',
            value: 'sell',
          },
          {
            id: 'buy',
            name: '구매',
            value: 'buy',
          },
        ]}
      />
      <FeedImageUpload />
      <Select
        placeholder="장르 태그 선택"
        selectType="multi"
        value={genre}
        onChangeValue={(selected) => {
          setGenre(selected);
        }}
        onCustomOpen={handleGenreClick}
      />
      <Select
        placeholder="굿즈 태그 선택"
        selectType="multi"
        value={goods}
        onChangeValue={(selected) => {
          setGoods(selected);
        }}
        onCustomOpen={handleGoodsClick}
      />
      <Input
        placeholder="제목"
        value={title}
        changeHandler={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Input
        placeholder="가격"
        value={price}
        changeHandler={(e) => {
          setPrice(thousandComma(e.target.value));
        }}
      />
      <TextArea
        value={content}
        changeHandler={(e) => {
          setContent(e.target.value);
        }}
        placeholder="내용"
      />
      <BottomSheet customContent={<SearchSelect searchResultList={genreDummySearch} />} ref={genreDialogRef} />
      <BottomSheet customContent={<SearchSelect searchResultList={goodsDummySearch} />} ref={goodsDialogRef} />
    </FormContainer>
  );
};
