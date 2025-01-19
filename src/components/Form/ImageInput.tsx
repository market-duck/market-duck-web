import { CameraIcon } from '@heroicons/react/24/solid';
import { Column } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { ImageItem } from '@market-duck/types/image';
import { ChangeEventHandler } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled(Column)`
  .inputLabel {
    margin-bottom: ${AppSpcing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
  }
`;

interface ImageInputsProps {
  title?: string;
  length: number;
  images: ImageItem[];
  imageHandler: ChangeEventHandler<HTMLInputElement>;
  deleteHandler: (idx: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const ThumbnailContainer = styled.li`
  position: relative;
`;

const ImagesContainer = styled.ul`
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: ${AppSpcing.XXS};
  padding-bottom: ${AppSpcing.S};
`;

const ImageButton = styled.label.attrs<{ $size: 'sm' | 'md' | 'lg' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
  };
})`
  background-color: ${AppSemanticColor.BG_SECONDARY.hex};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${AppSpcing.XXXS};
  cursor: pointer;

  &.size-sm {
    width: ${AppSpcing.XL};
    height: ${AppSpcing.XL};
    border-radius: ${AppRadii.S};
  }

  &.size-md {
    width: ${AppSpcing.XXXL};
    height: ${AppSpcing.XXXL};
    border-radius: ${AppRadii.M};
  }

  &.size-lg {
    width: ${AppSpcing.XXXXL};
    height: ${AppSpcing.XXXXL};
    border-radius: ${AppRadii.L};
  }
`;

/**
 * ### ImageInput
 * - 여러 이미지를 받을 수 있는 Image Input
 * - 상위 컴포넌트에서 {@link useImageInput} 을 사용해주세요.
 * @require length, imgSrcs, imageHandler, deleteHandle
 * @component
 */
export const ImagesInput = ({ title, length, images, imageHandler, deleteHandler, size = 'md' }: ImageInputsProps) => {
  return (
    <Container gap="XXS">
      {title && (
        <Typo className="inputLabel" tag="span" type="CAPTION_MD" weight={600}>
          {title}
        </Typo>
      )}
      <ImagesContainer>
        {length > images.length && (
          <li>
            <ImageButton htmlFor="image" $size={size}>
              <CameraIcon width={32} fill={AppSemanticColor.TEXT_PRIMARY.hex} />
              <Typo tag="span" type="CAPTION_MD" weight={400} className={AppSemanticColor.TEXT_PRIMARY.color}>
                {images.length} / {length}
              </Typo>
            </ImageButton>
          </li>
        )}
        {images.map((images, idx) => (
          <ThumbnailContainer key={idx}>
            <Thumbnail imgSrc={images.src} size={size} deleteHandler={() => deleteHandler(idx)} />
          </ThumbnailContainer>
        ))}
      </ImagesContainer>
      <input
        style={{ display: 'none' }}
        id="image"
        type="file"
        accept={'.gif, .jpg, .jpeg, .png, .heic'}
        maxLength={length}
        onChange={imageHandler}
        multiple={length > 1}
      />
    </Container>
  );
};
