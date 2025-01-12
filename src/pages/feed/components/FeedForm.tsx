import styled from 'styled-components';
import { Input } from '@market-duck/components/Form/Input';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { Select } from '@market-duck/components/Select/Select';
import { Tab } from '@market-duck/components/Tab/Tab';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { SelectOption } from '@market-duck/components/Select/Select';
import { thousandComma } from '@market-duck/utils/price';
import { SearchSelect } from '@market-duck/pages/feed/components/SearchSelect';
import { Button } from '@market-duck/components/Button/Button';
import { useForm } from '@market-duck/hooks/useForm';
import { Column } from '@market-duck/components/Flex/Flex';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { feedAPI } from '@market-duck/apis/feedAPI';
import { categoryAPI } from '@market-duck/apis/categoryAPI';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImagesInput } from '@market-duck/components/Form/ImageInput';
import { useImageInput } from '@market-duck/hooks/useImageInput';

const ImageUploadWrap = styled.div`
  display: flex;
  flex-direction: column;

  > .label {
    margin-bottom: ${AppSpcing.XXS};
  }
`;

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
  //TODO:: 필요시 successHandler props로 받거나..
  const navigate = useNavigate();

  const getCategoryData = async () => {
    //TODO:: API ERROR SHOULD BE FIX
    // const genreList = await categoryAPI.getCategoryList({ categoryType: 'GENRE', page: 0, size: 12, categoryName: '' });
    // const goodsList = await categoryAPI.getCategoryList({
    //   categoryType: 'GOODS',
    //   page: 0,
    //   size: 12,
    //   categoryName: '사카모토 데이즈',
    // });
  };

  const { images, deleteHandler, imageHandler } = useImageInput();

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
    onSubmit: async (values) => {
      console.log({ values });

      //피드 등록
      // const { success, feedId } = await feedAPI.createFeed({
      //   title: values.title,
      //   content: values.content,
      //   price: Number(values.price.replace(/,/g, '')),
      //   feedStatus: 'ON_SALE',
      //   goodsCategories: [
      //     {
      //       categoryId: 1,
      //       categoryType: 'GOODS',
      //     },
      //   ],
      //   genreCategories: [
      //     {
      //       categoryId: 1,
      //       categoryType: 'GENRE',
      //     },
      //   ],
      // });

      //이미지 등록
      if (images.length) {
        const imgList = images.filter((img) => img.file !== null).map((item) => item.file);
        console.log({ imgList });
        await feedAPI.uploadFeedImages({ feedId: 4, imgList: imgList as File[] });
      }

      // if (success) {
      //   //TODO:: 성공시 feed detail 페이지로 이동
      //   // navigate('');
      //   console.log('성공! feed detail로 이동시키기!');
      // }
    },
    validate: (values) => {
      const errorObj: { [key: string]: string } = {};

      // if (!values.genre.length) {
      //   errorObj.genre = '장르를 선택해주세요';
      // }

      // if (!values.goods.length) {
      //   errorObj.goods = '장르를 선택해주세요';
      // }

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

  const { bottomSheet } = useDialog();

  const handleGenreClick = () => {
    bottomSheet({
      customContent: (
        <SearchSelect
          searchResultList={genreDummySearch}
          handleChange={(selected) => {
            const isAlreadySelected = values.genre.some((item) => item.value === selected.value);
            if (!isAlreadySelected) {
              handleChange('genre', [...values.genre, selected]);
            }
          }}
        />
      ),
    });
  };

  const handleGoodsClick = () => {
    bottomSheet({
      customContent: (
        <SearchSelect
          searchResultList={goodsDummySearch}
          handleChange={(selected) => {
            const isAlreadySelected = values.goods.some((item) => item.value === selected.value);
            if (!isAlreadySelected) {
              handleChange('goods', [...values.goods, selected]);
            }
          }}
        />
      ),
    });
  };

  useEffect(() => {
    getCategoryData();
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
      <ImageUploadWrap>
        <p className="label"></p>
        <ImagesInput
          size="lg"
          length={10}
          imageHandler={(e) => {
            imageHandler(e);
          }}
          images={images}
          deleteHandler={deleteHandler}
        />
      </ImageUploadWrap>
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
        value={thousandComma(values.price)}
        changeHandler={(e) => {
          console.log(e.target.value);
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
    </FormContainer>
  );
};
