import styled from 'styled-components';
import { Input } from '@market-duck/components/Form/Input';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { Select } from '@market-duck/components/Select/Select';
import { FeedImageUpload } from './FeedImageUpload';
import { Tab } from '@market-duck/components/Tab/Tab';
import { useEffect, useState } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';

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
    genre: any;
    goods: any;
    title: string;
    content: string;
  };
}) => {
  //TODO::useSetFormValue...훅 만들기..
  const [genre, setGenre] = useState<number[]>([]);
  const [goods, setGoods] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const genreOptionList = [{ label: '', value: '' }];
  const goodsOptionList = [{ label: '', value: '' }];

  useEffect(() => {
    if (type === 'edit' && initialValue) {
      //TODO:: 기존 데이터 세팅
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
          setPrice(e.target.value);
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
