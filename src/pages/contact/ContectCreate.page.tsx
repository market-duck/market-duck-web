import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { ImagesInput } from '@market-duck/components/Form/ImageInput';
import { Input } from '@market-duck/components/Form/Input';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Select, SelectOption } from '@market-duck/components/Select/Select';
import { useForm } from '@market-duck/hooks/useForm';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(AppGutter)`
  height: calc(100dvh - 48px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .formContainer {
  }
`;

interface ISubmit {
  category: SelectOption[];
  title: string;
  content: string;
}

// TODO: API 연결 필요 (submit)
export const ContactCreate = () => {
  const { values, errors, handleChange, handleSubmit } = useForm<ISubmit>({
    initialValues: { category: [], title: '', content: '' },
    onSubmit: () => {
      console.log(values);
    },
    validate: (values) => {
      const errorObj: { [key: string]: string } = {};
      if (!values.title) errorObj.title = '제목을 입력해주세요';

      if (values.content.length < 10) errorObj.content = '내용을 열 자 이상 입력해주세요';

      if (!values.category.length) errorObj.category = '카테고리를 선택해주세요';
      return errorObj;
    },
  });
  const { imgFiles, imgSrcs, imageHandler, deleteHandler } = useImageInput();
  const navigate = useNavigate();

  return (
    <>
      <NavigationTop leftButtonIconType="back" title="1:1 문의" onLeftClick={() => navigate('/contact/list')} />
      <Wrap>
        <Column flex={0} gap="M" className="formContainer">
          <Select
            placeholder="문의 카테고리"
            selectType="single"
            value={values.category}
            onChangeValue={(selected) => {
              handleChange('category', selected);
            }}
            optionList={[
              { label: '피드', value: 'feed' },
              { label: '댓글', value: 'comment' },
              { label: '거래', value: 'trade' },
              { label: '계정', value: 'account' },
            ]}
            isError={!!errors.category}
          />
          <Input
            placeholder="제목"
            value={values.title}
            changeHandler={(e) => {
              handleChange('title', e.target.value);
            }}
            isError={!!errors.title}
            caption={errors.title ?? ''}
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
          <Column flex={0} gap="XXS">
            <ImagesInput
              title="이미지 업로드"
              size="lg"
              length={5}
              imgSrcs={imgSrcs}
              imageHandler={imageHandler}
              deleteHandler={deleteHandler}
            />
          </Column>
        </Column>
        <Button>작성</Button>
      </Wrap>
    </>
  );
};
