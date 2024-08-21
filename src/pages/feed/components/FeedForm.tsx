import styled from 'styled-components';
import { Input } from '@market-duck/components/Form/Input';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { Select } from '@market-duck/components/Select/Select';
import { FeedImageUpload } from './FeedImageUpload';
import { Tab } from '@market-duck/components/Tab/Tab';
import { useRef } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { SelectOption } from '@market-duck/components/Select/Select';
import { thousandComma } from '@market-duck/utils/price';
import { BottomSheet, BottomSheetHandle } from '@market-duck/components/Dialog/BottomSheet';
import { SearchSelect } from '@market-duck/pages/feed/components/SearchSelect';
import { Button } from '@market-duck/components/Button/Button';
import { useForm } from '@market-duck/hooks/useForm';

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

interface InitialValue {
  genre: Array<SelectOption>;
  goods: Array<SelectOption>;
  title: string;
  price: string;
  content: string;
}

export const FeedForm = ({ type = 'create', editData }: { type?: 'create' | 'edit'; editData?: InitialValue }) => {
  const { values, errors, handleChange, handleSubmit } = useForm<InitialValue>({
    initialValues:
      type === 'edit' && editData
        ? editData
        : {
            genre: [],
            goods: [],
            title: '',
            price: '',
            content: '',
          },
    onSubmit: (values) => {
      console.log('submit!!!!!!!!!!!!:', values);
    },
  });

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
        value={values.genre}
        onChangeValue={(selected) => {
          handleChange('genre', selected);
        }}
        onCustomOpen={handleGenreClick}
      />
      <Select
        placeholder="굿즈 태그 선택"
        selectType="multi"
        value={values.goods}
        onChangeValue={(selected) => {
          handleChange('goods', selected);
        }}
        onCustomOpen={handleGoodsClick}
      />
      <Input
        placeholder="제목"
        value={values.title}
        changeHandler={(e) => {
          handleChange('title', e.target.value);
        }}
      />
      <Input
        placeholder="가격"
        value={values.price}
        changeHandler={(e) => {
          handleChange('price', thousandComma(e.target.value));
        }}
      />
      <TextArea
        value={values.content}
        changeHandler={(e) => {
          handleChange('content', e.target.value);
        }}
        placeholder="내용"
      />
      <Button disabled={Object.keys(errors).length > 0} row size="large" onClick={handleSubmit}>
        작성하기
      </Button>
      <BottomSheet customContent={<SearchSelect searchResultList={genreDummySearch} />} ref={genreDialogRef} />
      <BottomSheet customContent={<SearchSelect searchResultList={goodsDummySearch} />} ref={goodsDialogRef} />
    </FormContainer>
  );
};
