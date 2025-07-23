import { XCircleIcon } from '@heroicons/react/24/solid';
import DefaultThumbnail from '@market-duck/assets/images/defaultThumbnail.svg';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';
import { BgImage } from './BgImage';

const ThumbNailWrap = styled.div`
  position: relative;

  .deleteBtn {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 4px;
    right: 4px;
  }
`;

const ThumbnailImg = styled(BgImage).attrs<{ $size: 'sm' | 'md' | 'lg' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
  };
})`
  background-size: cover;
  background-position: center;
  border-radius: ${AppRadii.CIRCLE};

  &.size-sm {
    width: ${AppSpacing.XL};
    height: ${AppSpacing.XL};
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

export const Thumbnail = ({
  imgSrc,
  size = 'md',
  deleteHandler,
}: {
  imgSrc?: string;
  size?: 'sm' | 'md' | 'lg';
  deleteHandler?: () => void;
}) => {
  const url = imgSrc || DefaultThumbnail;
  return (
    <ThumbNailWrap>
      <ThumbnailImg $src={url} $size={size} />
      {deleteHandler && (
        <button type="button" className="deleteBtn" onClick={deleteHandler}>
          <XCircleIcon />
        </button>
      )}
    </ThumbNailWrap>
  );
};
