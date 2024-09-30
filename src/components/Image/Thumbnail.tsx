import DefaultThumbnail from '@market-duck/assets/images/defaultThumbnail.svg';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';
import { BgImage } from './BgImage';

const ThumbnailImg = styled(BgImage).attrs<{ $size: 'sm' | 'md' | 'lg' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
  };
})`
  background-size: contain;

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

export const Thumbnail = ({ imgSrc, size = 'md' }: { imgSrc?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const url = imgSrc || DefaultThumbnail;
  return <ThumbnailImg $src={url} $size={size} />;
};
