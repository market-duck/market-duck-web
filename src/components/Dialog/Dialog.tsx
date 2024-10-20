import { Button, buttonVariantType } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { HTMLAttributes, MouseEventHandler } from 'react';
import { AppColor, AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const StyledModalContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

  .container {
    width: calc(100% - ${AppSpcing.XXL});
    min-width: 308px;
    border-radius: ${AppRadii.M};
    background-color: ${AppColor.WHITE.hex};
    border: none;
    padding: 0;
  }
  .contents {
    padding: ${AppSpcing.M};
  }
  .title {
    text-align: center;
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  }
  .desc {
    text-align: center;
    white-space: pre-line;
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
  }
`;

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  desc: string;
  confirmBtnVariant?: buttonVariantType;
  confirm?: MouseEventHandler;
  customConfirmBtnText?: string;
}

//TODO:: 모달 버튼 워딩 변경
export const Dialog = ({
  id,
  title,
  desc,
  confirmBtnVariant = 'primary',
  confirm,
  customConfirmBtnText = '확인',
  ...props
}: DialogProps) => {
  const { close } = useDialog();
  const closeHandler: MouseEventHandler = () => {
    close(id);
  };
  return (
    <StyledModalContainer {...props} onClick={closeHandler}>
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <Column gap="M" className="contents">
          <Column>
            <Typo tag="p" type="HEADING_SM" className="title">
              {title}
            </Typo>
            <Column>
              <Typo tag="p" type="BODY_SM" className="desc">
                {desc}
              </Typo>
            </Column>
          </Column>
          <Row gap="XS">
            {confirm && (
              <Button size="small" row variant="secondary" onClick={closeHandler}>
                취소
              </Button>
            )}
            <Button size="small" row variant={confirmBtnVariant} onClick={confirm ?? closeHandler}>
              {customConfirmBtnText}
            </Button>
          </Row>
        </Column>
      </div>
    </StyledModalContainer>
  );
};
