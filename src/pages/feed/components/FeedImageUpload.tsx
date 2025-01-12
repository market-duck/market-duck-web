import styled from 'styled-components';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { Row } from '@market-duck/components/Flex/Flex';
//TODO:: 변경 후 붙이기
import { ImagesInput } from '@market-duck/components/Form/ImageInput';
import { useImageInput } from '@market-duck/hooks/useImageInput';

const ImageUploadWrap = styled.div`
  display: flex;
  flex-direction: column;

  > .label {
    margin-bottom: ${AppSpcing.XXS};
  }
`;

export const FeedImageUpload = () => {
  const { images, deleteHandler, imageHandler, serverImageHandler } = useImageInput();

  return (
    <ImageUploadWrap>
      <p className="label"></p>
      <ImagesInput size="lg" length={10} imageHandler={imageHandler} images={images} deleteHandler={deleteHandler} />
    </ImageUploadWrap>
  );
};
