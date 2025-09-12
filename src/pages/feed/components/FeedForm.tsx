import { feedAPI } from '@market-duck/apis/feedAPI';
import { CategoryModel } from '@market-duck/apis/models/categoryModel';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { ImagesInput } from '@market-duck/components/Form/ImageInput';
import { Input } from '@market-duck/components/Form/Input';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { SearchCategory } from '@market-duck/components/SearchCategory/SearchCategory';
import { useDialog } from '@market-duck/hooks/useDialog';
import { useForm } from '@market-duck/hooks/useForm';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { FeedStatusType, FeedType, ReqFeedDataType } from '@market-duck/types/feed';
import { thousandComma } from '@market-duck/utils/price';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const ImageUploadWrap = styled.div`
  display: flex;
  flex-direction: column;

  > .label {
    margin-bottom: ${AppSpacing.XXS};
  }
`;

const CreateButton = styled(Button)`
  padding: 0;
  ${AppTypo.BODY_SM}
`;

const InputWrap = styled(Column)`
  > .inputLabel {
    margin-bottom: ${AppSpacing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    font-weight: 600;
    ${AppTypo.CAPTION_MD};
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${AppSpacing.XS};
  padding-bottom: 4.3rem;
`;

const Caption = styled.p`
  color: ${AppSemanticColor.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${AppTypo.CAPTION_MD};
`;

const TabWrap = styled(Row)`
  display: flex;
  gap: ${AppSpacing.XXS};
  width: 100%;
  border-radius: ${AppRadii.M};
  padding: ${AppSpacing.XXS};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  color: ${AppSemanticColor.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${AppTypo.BODY_MD};
  > .tab {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    padding: ${AppSpacing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    ${AppTypo.BODY_MD}
    &.selected {
      background-color: ${AppSemanticColor.BG_SECONDARY.hex};
      border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
      color: ${AppSemanticColor.TEXT_PRIMARY.hex};
    }
  }
`;

interface FeedFormData {
  genre: Array<CategoryModel>;
  goods: Array<CategoryModel>;
  title: string;
  price: string;
  content: string;
}

type EditData = FeedFormData & { feedId: number; images: string[] };

interface FeedFormProps {
  type?: 'create' | 'edit';
  editData?: EditData;
}

export const FeedForm = ({ type = 'create', editData }: FeedFormProps) => {
  const isEditFeed = type === 'edit' && !!editData;
  const [feedType, setFeedType] = useState<FeedType>('SALE');
  const [deleteImgIdxList, setDeleteImgIdxList] = useState<number[]>([]);
  const navigate = useNavigate();
  const { images, deleteHandler, imageHandler, serverImageHandler } = useImageInput();
  const { bottomSheet } = useDialog();

  const { mutateAsync: createFeed } = useMutation({
    mutationKey: ['feed', 'create'],
    mutationFn: async (submitData: ReqFeedDataType) => {
      return await feedAPI.createFeed(submitData);
    },
  });
  const { mutateAsync: editFeed } = useMutation({
    mutationKey: ['feed', 'edit'],
    mutationFn: async ({ feedId, submitData }: { feedId: number; submitData: ReqFeedDataType }) => {
      return await feedAPI.editFeed({
        feedId,
        feedData: submitData,
      });
    },
  });

  const formInitialValues = isEditFeed
    ? editData
    : {
        genre: [],
        goods: [],
        title: '',
        price: '',
        content: '',
      };

  const { values, errors, handleChange, handleSubmit } = useForm<FeedFormData>({
    initialValues: formInitialValues,
    onSubmit: async (values) => {
      const submitData = {
        title: values.title,
        content: values.content,
        price: Number(values.price.replace(/[^0-9]/g, '')),
        feedStatus: 'ON_SALE_OR_BUY' as FeedStatusType,
        feedType,
        goodsCategories: values.goods,
        genreCategories: values.genre,
      };

      let receivedFeedId;

      //피드 등록
      if (type === 'create') {
        const { success, feedId } = await createFeed(submitData);

        if (success) {
          receivedFeedId = feedId;
        }
      } else if (isEditFeed) {
        //이미지 삭제 병렬 처리
        if (deleteImgIdxList.length) {
          const success = await feedAPI.deleteFeedImages({ feedId: editData.feedId, indexIdList: deleteImgIdxList });

          if (!success) {
            alert('이미지 삭제에 실패했습니다!');
          }
        }

        //피드 수정
        const { success, feedId } = await editFeed({ submitData, feedId: editData?.feedId });

        if (success) {
          receivedFeedId = feedId;
        }
      }

      if (receivedFeedId) {
        const newImgList = images.filter((img) => img.file !== null && !img.isUploaded).map((img) => img.file);
        //이미지 등록
        if (newImgList.length) {
          await feedAPI.uploadFeedImages({ feedId: receivedFeedId, imgList: newImgList as File[] });
        }
      }

      if (receivedFeedId) {
        navigate(`/feed/read/${receivedFeedId}`);
        bottomSheet({
          title: `🎉 ${feedType === 'BUY' ? '구매' : '판매'} 피드 ${type === 'create' ? '작성' : '수정'}을 완료했습니다!`,
          buttonList: [
            {
              title: '공유하기',
              variant: 'primary',
              onClick: () => {
                console.log('공유하기 기능!');
              },
            },
          ],
        });
      }
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

  const deleteImageHandler = async (imgIndex: number, originIndex?: number) => {
    //여기서 imgIndex는 단순히 현재 이미지 리스트의 index를 뜻하는 거고
    //서버로 보내야 할 거는 editInfo인 경우에 가지는 index로... 처음에 세팅이 되어야 할듯
    console.log({ imgIndex, originIndex });
    if (isEditFeed && images[imgIndex].isUploaded && originIndex !== undefined) {
      setDeleteImgIdxList((prev) => [...prev, originIndex]);
    }
    //컴포넌트 내에서 제거
    deleteHandler(imgIndex);
  };

  useEffect(() => {
    if (editData && editData.images) {
      serverImageHandler(editData.images);
    }
  }, []);

  return (
    <>
      <NavigationTop
        leftButtonIconType="back"
        title={type === 'create' ? '피드 작성' : '피드 수정'}
        rightButton={<CreateButton variant="text">{type === 'create' ? '올리기' : '수정하기'}</CreateButton>}
        onRightClick={() => handleSubmit()}
      />
      <AppGutter>
        <FormContainer>
          <ImageUploadWrap>
            <p className="label"></p>
            <ImagesInput
              size="lg"
              length={10}
              imageHandler={(e) => {
                imageHandler(e);
              }}
              images={images}
              deleteHandler={deleteImageHandler}
            />
          </ImageUploadWrap>
          <Input
            placeholder="제목을 입력해주세요."
            label="제목"
            value={values.title}
            changeHandler={(e) => {
              handleChange('title', e.target.value);
            }}
            isError={!!errors.title}
            caption={errors.title ?? ''}
          />
          <InputWrap>
            <p className="inputLabel">장르 카테고리</p>
            <SearchCategory
              placeholder="ex. 귀멸의 칼날"
              selecteds={values.genre}
              changeSelectedsHandler={(selected) => {
                handleChange('genre', selected);
              }}
              categoryType="GENRE"
              isError={!!errors.genre}
            />
            {errors.genre && <Caption>{errors.genre}</Caption>}
          </InputWrap>
          <InputWrap>
            <p className="inputLabel">굿즈 태그</p>
            <SearchCategory
              placeholder="ex. 아크릴"
              selecteds={values.goods}
              changeSelectedsHandler={(selected) => {
                handleChange('goods', selected);
              }}
              categoryType="GOODS"
              isError={!!errors.goods}
            />
            {errors.goods && <Caption>{errors.goods}</Caption>}
          </InputWrap>
          <InputWrap>
            <p className="inputLabel">판매 타입</p>{' '}
            <TabWrap>
              <button
                type="button"
                className={`tab ${feedType === 'SALE' ? 'selected' : ''}`}
                onClick={() => setFeedType('SALE')}
              >
                판매
              </button>
              <button
                type="button"
                className={`tab ${feedType === 'BUY' ? 'selected' : ''}`}
                onClick={() => setFeedType('BUY')}
              >
                구매
              </button>
            </TabWrap>
          </InputWrap>
          <Input
            label="가격"
            value={thousandComma(values.price)}
            changeHandler={(e) => {
              handleChange('price', thousandComma(e.target.value));
            }}
            isError={!!errors.price}
            caption={errors.price ?? ''}
          />
          <TextArea
            label="내용"
            value={values.content}
            changeHandler={(e) => {
              handleChange('content', e.target.value);
            }}
            placeholder="내용을 입력해주세요."
            isError={!!errors.content}
            caption={errors.content ?? ''}
          />
        </FormContainer>
      </AppGutter>
    </>
  );
};
