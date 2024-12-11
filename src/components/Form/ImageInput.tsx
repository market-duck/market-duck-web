import { XCircleIcon } from '@heroicons/react/24/solid';
import { Column } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { ImageItem } from '@market-duck/types/image';
import { ChangeEventHandler } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
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
  .deleteBtn {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 4px;
    right: 4px;
  }
`;

const ImagesContainer = styled.ul`
  width: 100%;
  overflow-x: auto;
  display: flex;
  gap: ${AppSpcing.XXS};
  padding-bottom: ${AppSpcing.S};
`;

/**
 * ### ImageInput
 * - 여러 이미지를 받을 수 있는 Image Input
 * - 상위 컴포넌트에서 {@link useImageInput} 을 사용해주세요.
 * @require length, imgSrcs, imageHandler, deleteHandle
 * @component
 */
export const ImagesInput = ({ title, length, images, imageHandler, deleteHandler, size }: ImageInputsProps) => {
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
            <label htmlFor="image">
              <Thumbnail size={size} />
            </label>
          </li>
        )}
        {images.map((images, idx) => (
          <ThumbnailContainer key={idx}>
            <Thumbnail imgSrc={images.src} size={size} />
            <button className="deleteBtn" onClick={() => deleteHandler(idx)}>
              <XCircleIcon />
            </button>
          </ThumbnailContainer>
        ))}
      </ImagesContainer>
      <input
        style={{ display: 'none' }}
        id="image"
        type="file"
        accept="image/*"
        maxLength={length}
        onChange={imageHandler}
        multiple={length > 1}
      />
    </Container>
  );
};
