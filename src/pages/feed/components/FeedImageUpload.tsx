import styled from 'styled-components';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { Row } from '@market-duck/components/Flex/Flex';

const ImageUploadWrap = styled.div`
  display: flex;
  flex-direction: column;

  > .label {
    margin-bottom: ${AppSpcing.XXS};
  }
`;

const ImageList = styled(Row)`
  gap: ${AppSpcing.XXS};
  overflow-x: scroll;
`;

export const FeedImageUpload = () => {
  const dummyImageDataList = [
    {
      id: '1',
      src: '',
    },
  ];

  return (
    <ImageUploadWrap>
      <p className="label"></p>
      <ImageList>
        {dummyImageDataList.map((item) => {
          return <Thumbnail key={item.id} imgSrc={item.src} size="lg" />;
        })}
      </ImageList>
    </ImageUploadWrap>
  );
};
