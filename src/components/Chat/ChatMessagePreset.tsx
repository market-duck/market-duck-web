import styled from 'styled-components';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { useState } from 'react';
import { Typo } from '@market-duck/components/Typo/Typo';
import { Button } from '@market-duck/components/Button/Button';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';

const Wrapper = styled(Column)`
  &.presetBox {
    padding: ${AppSpacing.M} 0;
    gap: ${AppSpacing.XS};
  }
`;

export const ChatMessagePresetCreator = () => {
  const [presetContent, setPresetContent] = useState('');

  return (
    <Wrapper gap="XL">
      <Column>
        <Typo tag="p" type="HEADING_SM" weight={500} className={AppSemanticColor.TEXT_PRIMARY.color} align="center">
          자주쓰는문구
        </Typo>
        <Typo tag="p" type="BODY_SM" weight={500} className={AppSemanticColor.TEXT_TERTIARY.color} align="center">
          자주 쓰는 문구를 저장하여 거래시 활용해보세요!
        </Typo>
      </Column>
      <TextArea
        value={presetContent}
        changeHandler={(e) => {
          if (e.target.value.length) {
            setPresetContent(e.target.value);
          }
        }}
        placeholder="내용을 입력해주세요."
      />
    </Wrapper>
  );
};

export const ChatMessagePresetBox = () => {
  return (
    <Wrapper className="presetBox">
      <Row gap="XXS">
        <Typo tag="span" type="CAPTION_MD" weight={600} className={AppSemanticColor.TEXT_PRIMARY.color}>
          자주쓰는문구
        </Typo>
        <Typo tag="span" type="CAPTION_MD" weight={400} className={AppSemanticColor.TEXT_TERTIARY.color}>
          최대 5개까지 입력 가능합니다
        </Typo>
      </Row>
      <Row>
        <Button
          type="button"
          variant="secondary"
          size="medium"
          leftIcon="PlusCircleIcon"
          iconFill={true}
          onClick={() => {
            //TODO:: open center modal for add new preset
          }}
        >
          추가하기
        </Button>
      </Row>
    </Wrapper>
  );
};
