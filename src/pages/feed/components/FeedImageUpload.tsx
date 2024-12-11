import styled from 'styled-components';
import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
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

const ImageList = styled(Row)`
  gap: ${AppSpcing.XXS};
  overflow-x: scroll;
`;

export const FeedImageUpload = () => {
  const dummyImageDataList = [
    {
      id: '1',
      src: 'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
    },
    {
      id: '2',
      src: 'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
    },
    {
      id: '3',
      src: 'https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611722.jpg?t=st=1717847776~exp=1717851376~hmac=bf7567ff138802e017c76b9b0ccc2ec14d3ab51ce802bc96e93b4a494ee4e6af&w=1060',
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
