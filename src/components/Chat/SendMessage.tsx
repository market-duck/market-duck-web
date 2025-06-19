import { PhotoIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@market-duck/components/Button/IconButton';
import { Row } from '@market-duck/components/Flex/Flex';
import { InputWithImage } from '@market-duck/components/Form/Input';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { ChatMessageType, ChatMessageTypeEnum } from '@market-duck/types/chat';
import { useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled(Row)`
  position: sticky;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: ${AppSpcing.S} ${AppSpcing.M};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  flex-grow: 0;

  .imageBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > svg {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};
      &:hover {
        color: ${AppSemanticColor.ICON_INTERACTIVE_SECONDARY_HOVER.hex};
      }
      &:active {
        color: ${AppSemanticColor.ICON_INTERACTIVE_SECONDARY_PRESS.hex};
      }
      &:disabled {
        color: ${AppSemanticColor.ICON_DISABLED.hex};
      }
    }
  }
`;

export const SendMessage = ({
  sendAction,
}: {
  sendAction: (type: ChatMessageType, text: string, imageFiles?: File[]) => void;
}) => {
  const [message, setMessage] = useState('');
  const { images, imageHandler, deleteHandler, allDeleteHandler } = useImageInput();

  const sendMessageHandler = () => {
    if (images.length) {
      const imageFileList = images.map((item) => item.file).filter((file) => file !== null) as File[];

      sendAction(ChatMessageTypeEnum.IMAGE, '', imageFileList);
      allDeleteHandler();
    }

    if (message) {
      sendAction(ChatMessageTypeEnum.TEXT, message);
      setMessage('');
    }
  };

  return (
    <Container gap="XS">
      <label className="imageBtn" htmlFor="image">
        <PhotoIcon width={24} height={24} />
      </label>
      <InputWithImage
        images={images}
        deleteHandler={deleteHandler}
        placeholder="메시지를 입력해주세요"
        value={message}
        changeHandler={(e) => setMessage(e.target.value)}
      />
      <IconButton icon="PaperAirplaneIcon" variant="primary" iconFill onClick={sendMessageHandler} />
      <input
        style={{ display: 'none' }}
        id="image"
        type="file"
        accept={'.gif, .jpg, .jpeg, .png'}
        onChange={imageHandler}
        multiple={true}
      />
    </Container>
  );
};
