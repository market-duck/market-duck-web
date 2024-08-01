import styled from 'styled-components';
import { Input } from '@market-duck/components/Form/Input';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { Select } from '@market-duck/components/Select/Select';
import { FeedImageUpload } from './FeedImageUpload';
import { Tab } from '@market-duck/components/Tab/Tab';
import { useEffect, useState } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { SelectOption } from '@market-duck/components/Select/Select';
import { thousandComma } from '@market-duck/utils/price';

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

  const genreOptionList = [
    { label: '장르1', value: 'genre1' },
    { label: '장르2', value: 'genre2' },
  ];
  const goodsOptionList = [
    { label: '상품1', value: 'goods1' },
    {
      label: '상품2',
      value: 'goods2',
    },
  ];

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
        optionList={genreOptionList}
        value={genre}
        onChangeValue={(selected) => {
          setGenre(selected);
        }}
      />
      <Select
        placeholder="굿즈 태그 선택"
        selectType="multi"
        optionList={goodsOptionList}
        value={goods}
        onChangeValue={(selected) => {
          setGoods(selected);
        }}
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
      {/* TODO:: TextArea 엔터, 띄어쓰기 반영 체크 */}
      <TextArea
        value={content}
        changeHandler={(e) => {
          setContent(e.target.value);
        }}
        placeholder="내용"
      />
    </FormContainer>
  );
};
