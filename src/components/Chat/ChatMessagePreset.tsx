import styled from 'styled-components';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { useState } from 'react';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { Input } from '../Form/Input';
import { BaseQuickPhraseModel } from '@market-duck/apis/models/quickPhraseModel';
import { Button } from '../Button/Button';

const Wrapper = styled(Column)`
  padding: ${AppSpacing.M};
  border-top: 1px solid ${AppSemanticColor.BG_TERTIARY.hex};
  &.presetBox {
    padding: ${AppSpacing.S} ${AppSpacing.M};
    gap: ${AppSpacing.XS};
  }

  .presetTitle {
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
  }

  .presetTextArea {
    height: 5.5rem;
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
  }
`;

export const ChatMessagePresetCreator = () => {
  const [presetTitle, setPresetTitle] = useState('');
  const [presetContent, setPresetContent] = useState('');

  return (
    <Wrapper gap="XL">
      <Typo tag="p" type="HEADING_SM" weight={600} align="center">
        자주쓰는문구
      </Typo>
      <Input
        id="presetTitle"
        value={presetTitle}
        changeHandler={(e) => setPresetTitle(e.target.value)}
        label="제목"
        placeholder="ex. 배송지"
        className="presetTitle"
      />
      <TextArea
        className="presetTextArea"
        value={presetContent}
        changeHandler={(e) => {
          if (e.target.value.length) {
            setPresetContent(e.target.value);
          }
        }}
        label="내용"
        placeholder="내용을 입력해주세요."
        maxLength={100}
        caption={`${presetContent.length}/100`}
      />
    </Wrapper>
  );
};

const ListWrapper = styled(Column)`
  gap: 1rem;

  .presetItem {
    padding: ${AppSpacing.XS};
    border-bottom: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
    &:last-child {
      border: none;
    }

    .left {
      overflow: hidden;

      .content {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 90%;
        display: block;
      }
    }
  }
`;

export const MessagePresetList = ({ presetList }: { presetList: BaseQuickPhraseModel[] }) => {
  return (
    <ListWrapper>
      <Column>
        <Typo tag="p" type="HEADING_SM" weight={600} color={AppSemanticColor.TEXT_PRIMARY.color} align="center">
          자주쓰는문구
        </Typo>
        <Typo tag="p" type="BODY_SM" weight={500} color={AppSemanticColor.TEXT_TERTIARY.color} align="center">
          최대 5개
        </Typo>
      </Column>
      {presetList.length ? (
        <Column>
          {presetList.map((item) => {
            return (
              <Row key={item.quickPhraseId} justify="between" alignItems="center" className="presetItem">
                <Column className="left">
                  <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_PRIMARY.color} weight={500}>
                    {item.title}
                  </Typo>
                  <Typo
                    tag="p"
                    type="CAPTION_MD"
                    weight={500}
                    className={`${AppSemanticColor.TEXT_TERTIARY.color} content`}
                  >
                    {item.content}
                  </Typo>
                </Column>
                <Row gap="XXS">
                  <Button size="small" variant="tertiary">
                    수정
                  </Button>
                  <Button size="small" variant="tertiary">
                    삭제
                  </Button>
                </Row>
              </Row>
            );
          })}
        </Column>
      ) : (
        <div></div>
      )}
    </ListWrapper>
  );
};
