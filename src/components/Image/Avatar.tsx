import { BgImage } from './BgImage';
import styled from 'styled-components';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppRadii } from 'src/styles/tokens/AppRadii';

const AvatarImg = styled(BgImage).attrs<{ $size: 'sm' | 'md' | 'lg' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
  };
})`
  background-size: contain;
  border-radius: ${AppRadii.CIRCLE};

  &.size-sm {
    width: ${AppSpcing.XXL};
    height: ${AppSpcing.XXL};
  }

  &.size-md {
    width: ${AppSpcing.XXXL};
    height: ${AppSpcing.XXXL};
  }

  &.size-lg {
    width: ${AppSpcing.XXXXL};
    height: ${AppSpcing.XXXXL};
  }
`;

export const Avatar = ({ imgSrc, size = 'md' }: { imgSrc?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const url =
    imgSrc ||
    'https://pixabay.com/ko/photos/%EA%B3%A0%EC%96%91%EC%9D%B4-%EB%A3%A8-%EB%8A%99%EC%9D%80-%EB%B0%94%EB%9D%BC%EB%B3%B4%EB%8B%A4-5183427/';
  return <AvatarImg $src={url} $size={size} />;
};
