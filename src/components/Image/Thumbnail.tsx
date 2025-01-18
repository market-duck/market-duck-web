import DefaultThumbnail from '@market-duck/assets/images/defaultThumbnail.svg';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';
import { BgImage } from './BgImage';
import { XCircleIcon } from '@heroicons/react/24/solid';

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
        <button className="deleteBtn" onClick={deleteHandler}>
          <XCircleIcon />
        </button>
      )}
    </ThumbNailWrap>
  );
};
