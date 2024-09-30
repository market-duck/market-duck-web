import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { ChangeEventHandler } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const Container = styled(Column)`
  .inputLabel {
    margin-bottom: ${AppSpcing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    font-weight: 600;
    ${AppTypo.CAPTION_MD};
  }
`;

interface ImageInputsProps {
  title?: string;
  length: number;
  imgSrcs: (string | undefined)[];
  imageHandler: ChangeEventHandler<HTMLInputElement>;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ### ImageInput
 * - 여러 이미지를 받을 수 있는 Image Input
 * - 상위 컴포넌트에서 {@link useImageInput} 을 사용해주세요.
 * @component
 */
export const ImagesInput = ({ title, length, imgSrcs, imageHandler, size }: ImageInputsProps) => {
  return (
    <Container gap="XXS">
      {title && <span className="inputLabel">{title}</span>}
      <Row gap="XXS" flexWrap="wrap">
        {imgSrcs.map((src, idx) => (
          <Thumbnail imgSrc={src} key={idx} size={size} />
        ))}
        {length > imgSrcs.length && (
          <label htmlFor="image">
            <Thumbnail size={size} />
          </label>
        )}
        <input
          style={{ display: 'none' }}
          id="image"
          type="file"
          accept="image/*"
          maxLength={length}
          onChange={imageHandler}
        />
      </Row>
    </Container>
  );
};
