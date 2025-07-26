import { PhotoIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@market-duck/components/Button/IconButton';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { InputWithImage } from '@market-duck/components/Form/Input';
import { useDialog } from '@market-duck/hooks/useDialog';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { ChatMessageType, ChatMessageTypeEnum } from '@market-duck/types/chat';
import { useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';

import styled from 'styled-components';
import { ChatMessagePresetBox, ChatMessagePresetCreator } from './ChatMessagePreset';

const Container = styled(Column)`
  position: sticky;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: ${AppSpacing.S} ${AppSpacing.M};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  flex-grow: 0;

  .iconBtn {
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
  const { bottomSheet, close } = useDialog();

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
    <Container>
      <Row gap="S">
        <label className="iconBtn" htmlFor="image">
          <PhotoIcon width={24} height={24} />
        </label>
        <div
          className="iconBtn"
          onClick={() => {
            if (true) {
              bottomSheet({
                title: '자주쓰는문구',
                desc: '자주 쓰는 문구를 저장하여 거래시 활용해보세요!',
                customContent: <ChatMessagePresetCreator />,
                buttonList: [
                  {
                    title: '취소',
                    variant: 'secondary',
                  },
                  {
                    title: '저장',
                    variant: 'primary',
                    onClick: () => {
                      console.log('저장!!');
                      close();
                    },
                  },
                ],
              });
            } else {
              //TODO:: 자주 쓰는 문구가 존재하는 경우 아래 쪽 영역 열기
            }
          }}
        >
          <PencilSquareIcon width={24} height={24} />
        </div>
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
      </Row>
      <ChatMessagePresetBox />
    </Container>
  );
};
