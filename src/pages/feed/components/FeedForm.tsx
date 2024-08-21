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
import { Column } from '@market-duck/components/Flex/Flex';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppTypo } from 'src/styles/tokens/AppTypo';

const SelectWrap = styled(Column)``;

//TODO :: 결과값 없을 때 empty ui 필요

//TODO :: api data로 변경 예정
const genreDummySearch = [
  { label: '주술회전', value: '주술회전' },
  { label: '하이큐!!', value: '하이큐!!' },
  { label: '장송의 프리렌', value: '장송의 프리렌' },
  { label: '던전밥', value: '던전밥' },
  { label: '슬램덩크', value: '슬램덩크' },
  { label: '봇치 더 록!', value: '봇치 더 록!' },
  { label: '앙상블 스타즈!!', value: '앙상블 스타즈!!' },
];

//TODO :: api data로 변경 예정
const goodsDummySearch = [
  { label: '피규어', value: '피규어' },
  { label: '넨도로이드', value: '넨도로이드' },
  { label: '쯔무쯔무', value: '쯔무쯔무' },
];

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${AppSpcing.M};
  padding-bottom: 4.3rem;
`;

const Caption = styled.p`
  color: ${AppSemanticColor.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${AppTypo.CAPTION_MD};
`;

interface InitialValue {
  genre: Array<SelectOption>;
  goods: Array<SelectOption>;
  title: string;
  price: string;
  content: string;
}

// interface ErrorObject{
//   genre?: string;
//   goods?:string;
//   title?: string;
//   price?: string;
//   content?: string;
// }

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
    validate: (values) => {
      const errorObj: { [key: string]: string } = {};

      if (!values.genre.length) {
        errorObj.genre = '장르를 선택해주세요';
      }

      if (!values.goods.length) {
        errorObj.goods = '장르를 선택해주세요';
      }

      if (!values.title) {
        errorObj.title = '제목을 입력해주세요';
      }

      if (!values.price) {
        errorObj.price = '가격을 입력해주세요.';
      }

      if (values.content.length < 10) {
        errorObj.content = '내용을 열 자 이상 입력해주세요';
      }

      return errorObj;
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
      <SelectWrap>
        <Select
          placeholder="장르 태그 선택"
          selectType="multi"
          value={values.genre}
          onChangeValue={(selected) => {
            handleChange('genre', selected);
          }}
          onCustomOpen={handleGenreClick}
        />
        {errors.genre && <Caption>{errors.genre}</Caption>}
      </SelectWrap>
      <SelectWrap>
        <Select
          placeholder="굿즈 태그 선택"
          selectType="multi"
          value={values.goods}
          onChangeValue={(selected) => {
            handleChange('goods', selected);
          }}
          onCustomOpen={handleGoodsClick}
        />
        {errors.goods && <Caption>{errors.goods}</Caption>}
      </SelectWrap>
      <Input
        placeholder="제목"
        value={values.title}
        changeHandler={(e) => {
          handleChange('title', e.target.value);
        }}
        isError={!!errors.title}
        caption={errors.title ?? ''}
      />
      <Input
        placeholder="가격"
        value={values.price}
        changeHandler={(e) => {
          handleChange('price', thousandComma(e.target.value));
        }}
        isError={!!errors.price}
        caption={errors.price ?? ''}
      />
      <TextArea
        value={values.content}
        changeHandler={(e) => {
          handleChange('content', e.target.value);
        }}
        placeholder="내용"
        isError={!!errors.content}
        caption={errors.content ?? ''}
      />
      <Button disabled={Object.keys(errors).length > 0} row size="large" onClick={handleSubmit}>
        작성하기
      </Button>
      <BottomSheet
        customContent={
          <SearchSelect
            searchResultList={genreDummySearch}
            handleChange={(selected) => {
              const isAlreadySelected = values.genre.some((item) => item.value === selected.value);
              if (!isAlreadySelected) {
                handleChange('genre', [...values.genre, selected]);
              }
            }}
          />
        }
        ref={genreDialogRef}
      />
      <BottomSheet
        customContent={
          <SearchSelect
            searchResultList={goodsDummySearch}
            handleChange={(selected) => {
              const isAlreadySelected = values.goods.some((item) => item.value === selected.value);
              if (!isAlreadySelected) {
                handleChange('goods', [...values.goods, selected]);
              }
            }}
          />
        }
        ref={goodsDialogRef}
      />
    </FormContainer>
  );
};
