import Placeholder from '@market-duck/assets/images/placeholder.svg';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';
import { BgImage } from './BgImage';

const AvatarImg = styled(BgImage).attrs<{ $size: 'sm' | 'md' | 'lg' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
  };
})`
  background-size: cover;
  background-position: center;
  border-radius: ${AppRadii.M};

  &.size-sm {
    width: ${AppSpacing.XXL};
    height: ${AppSpacing.XXL};
  }

  &.size-md {
    width: ${AppSpacing.XXXL};
    height: ${AppSpacing.XXXL};
  }

  &.size-lg {
    width: ${AppSpacing.XXXXL};
    height: ${AppSpacing.XXXXL};
  }
`;

export const Avatar = ({ imgSrc, size = 'md' }: { imgSrc?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const url = imgSrc || Placeholder;
  return <AvatarImg $src={url} $size={size} />;
};
