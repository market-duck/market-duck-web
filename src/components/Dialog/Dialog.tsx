import { Button, buttonVariantType } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { DialogHTMLAttributes, forwardRef, MouseEventHandler, useEffect, useImperativeHandle, useRef } from 'react';
import { AppColor, AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const StyledModalContainer = styled.dialog`
  width: calc(100% - ${AppSpcing.XXL});
  max-width: 308px;
  border-radius: ${AppRadii.M};
  background-color: ${AppColor.WHITE.hex};
  border: none;
  padding: 0;

  /* &:not([open]) {
    opacity: 0;
  }
  &[open] {
    opacity: 1;
  }

  transition: opacity 1s ease-in-out; */

  .container {
    padding: ${AppSpcing.M};
  }
  .title {
    text-align: center;
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  }
  .desc {
    text-align: center;
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
  }
  &::backdrop {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.4);
  }
`;

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  title: string;
  desc: string;
  confirmBtnVariant?: buttonVariantType;
  confirmBtnHandler?: MouseEventHandler;
}

export interface DialogHandle {
  open: () => void;
  close: () => void;
}

export const Dialog = forwardRef<DialogHandle, DialogProps>(
  ({ title, desc, confirmBtnVariant, confirmBtnHandler, ...props }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      },
      close: () => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      },
    }));

    const closeHandler = () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dialogRef.current && event.target === dialogRef.current) {
          dialogRef.current.close();
        }
      };

      if (dialogRef.current) {
        dialogRef.current.addEventListener('click', handleClickOutside);
      }
    }, []);

    return (
      <StyledModalContainer ref={dialogRef} {...props}>
        <Column gap="M" className="container">
          <Column>
            <Typo tag="p" type="HEADING_SM" className="title">
              {title}
            </Typo>
            <Typo tag="p" type="BODY_SM" className="desc">
              {desc}
            </Typo>
          </Column>
          <Row gap="XS">
            <Button size="small" row variant="secondary" onClick={closeHandler}>
              취소
            </Button>
            <Button size="small" row variant={confirmBtnVariant ?? 'primary'} onClick={confirmBtnHandler}>
              확인
            </Button>
          </Row>
        </Column>
      </StyledModalContainer>
    );
  },
);