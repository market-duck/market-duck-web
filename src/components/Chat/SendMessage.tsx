import { IconButton } from '@market-duck/components/Button/IconButton';
import { Row } from '@market-duck/components/Flex/Flex';
import { Input } from '@market-duck/components/Form/Input';
import { useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled(Row)`
  position: sticky;
  width: 100%;
  left: 0;
  bottom: 60px;
  padding: ${AppSpcing.S} ${AppSpcing.M};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
`;

export const SendMessage = () => {
  const [message, setMessage] = useState('');
  return (
    <Container gap="XS">
      <IconButton icon="PhotoIcon" variant="secondary" iconFill />
      <Input placeholder="메시지를 입력해주세요" value={message} changeHandler={(e) => setMessage(e.target.value)} />
      <IconButton icon="PaperAirplaneIcon" variant="primary" iconFill />
    </Container>
  );
};
