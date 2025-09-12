import styled from 'styled-components';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { TextArea } from '@market-duck/components/Form/TextArea';
import { useEffect, useState } from 'react';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { Input } from '../Form/Input';
import { BaseQuickPhraseModel } from '@market-duck/apis/models/quickPhraseModel';
import { Button } from '../Button/Button';
import { useForm } from '@market-duck/hooks/useForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { quickPhraseAPI } from '@market-duck/apis/quickPhraseAPI';
import { useToast } from '@market-duck/hooks/useToast';
import { useDialog } from '@market-duck/hooks/useDialog';

const Wrapper = styled(Column)`
  padding: ${AppSpacing.M};

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

  .presetButtons {
    > button {
      flex: 1;
    }
  }
`;

interface PresetData {
  title: string;
  content: string;
}

export const ChatMessagePresetCreator = ({
  editData,
  close,
}: {
  editData?: BaseQuickPhraseModel;
  close: () => void;
}) => {
  const isEdit = !!editData;
  const toastOpen = useToast();
  const queryClient = useQueryClient();

  const { mutateAsync: createQuickPhrase } = useMutation({
    mutationKey: ['quickPhrase', 'create'],
    mutationFn: async ({ title, content }: PresetData) => {
      return isEdit
        ? await quickPhraseAPI.patchQuickPhrase({
            quickPhraseId: editData.quickPhraseId,
            title,
            content,
            category: '',
          })
        : await quickPhraseAPI.createQuickPhrase({
            title,
            content,
            category: '', //TODO:: 이거 우선 빈 문자열?
          });
    },
    onSuccess: () => {
      close();
      toastOpen({ title: '자주 쓰는 문구 추가', desc: '자주 쓰는 문구 추가를 완료했습니다', type: 'default' });
      queryClient.invalidateQueries({ queryKey: ['commentaryList'] });
    },
    onError: () => {
      toastOpen({ title: '자주 쓰는 문구 추가', desc: '자주 쓰는 문구 추가에 실패했습니다', type: 'default' });
    },
  });

  const { values, setValues, handleChange, handleSubmit } = useForm<PresetData>({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: async (submitData) => {
      await createQuickPhrase(submitData);
    },
  });

  useEffect(() => {
    if (isEdit) {
      setValues({ title: editData.title, content: editData.content });
    }
  }, []);

  return (
    <Wrapper gap="XL">
      <Typo tag="p" type="HEADING_SM" weight={600} align="center">
        자주쓰는문구
      </Typo>
      <Input
        id="title"
        value={values.title}
        changeHandler={(e) => {
          handleChange('title', e.target.value);
        }}
        label="제목"
        placeholder="ex. 배송지"
        className="presetTitle"
      />
      <TextArea
        className="presetTextArea"
        value={values.content}
        changeHandler={(e) => {
          handleChange('content', e.target.value);
        }}
        label="내용"
        placeholder="내용을 입력해주세요."
        maxLength={100}
        caption={`${values.content.length}/100`}
      />
      <Row gap="XS" className="presetButtons">
        <Button
          variant="secondary"
          size="medium"
          row
          onClick={() => {
            close();
          }}
        >
          취소
        </Button>
        <Button variant="primary" size="medium" row onClick={handleSubmit}>
          저장
        </Button>
      </Row>
    </Wrapper>
  );
};

const ListWrapper = styled(Column)`
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
  const { modal, confirm, close } = useDialog();
  const toastOpen = useToast();
  const queryClient = useQueryClient();

  const openCreatePresetModal = (data: BaseQuickPhraseModel) => {
    return modal({
      slotComponent: <ChatMessagePresetCreator editData={data} close={close} />,
      buttonList: [],
      preventBackDropClickClose: true,
    });
  };

  const { mutateAsync: deleteQuickPhrase } = useMutation({
    mutationKey: ['quickPhrase', 'create'],
    mutationFn: async ({ quickPhraseId }: { quickPhraseId: number }) => {
      return await quickPhraseAPI.deleteQuickPhrase({ quickPhraseId });
    },
    onSuccess: () => {
      close();
      toastOpen({ title: '자주 쓰는 문구 삭제', desc: '자주 쓰는 문구 삭제를 완료했습니다', type: 'default' });
      queryClient.invalidateQueries({ queryKey: ['commentaryList'] });
    },
    onError: () => {
      toastOpen({ title: '자주 쓰는 문구 삭제', desc: '자주 쓰는 문구 삭제에 실패했습니다', type: 'default' });
    },
  });

  return (
    <ListWrapper>
      <Column>
        <Typo tag="p" type="HEADING_SM" weight={600} color={AppSemanticColor.TEXT_PRIMARY.color} align="center">
          자주쓰는문구
        </Typo>
        <Typo tag="p" type="BODY_SM" weight={500} color={AppSemanticColor.TEXT_SECONDARY.color} align="center">
          최대 5개까지 입력할 수 있습니다.
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
                  <Button size="small" variant="tertiary" onClick={() => openCreatePresetModal(item)}>
                    수정
                  </Button>
                  <Button
                    size="small"
                    variant="tertiary"
                    onClick={async () => {
                      const result = await confirm({
                        title: `'${item.title}' 문구를 삭제하시겠습니까?`,
                        desc: '삭제 후 복구할 수 없습니다.',
                        positiveBtnText: '삭제',
                        positiveBtnVariant: 'danger',
                      });

                      if (result) {
                        await deleteQuickPhrase({ quickPhraseId: item.quickPhraseId });
                      }
                    }}
                  >
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
