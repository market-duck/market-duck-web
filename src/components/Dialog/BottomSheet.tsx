import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { AppColor, AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const StyledBottomSheet = styled.dialog`
  width: 100%;
  max-width: 768px;
  background-color: ${AppColor.WHITE.hex};
  border: none;
  border-radius: ${AppRadii.L} ${AppRadii.L} ${AppRadii.NONE} ${AppRadii.NONE};
  padding: 0;
  bottom: 0;
  margin: auto auto 0;

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

export interface BottomSheetProps {
  title?: string;
  desc?: string;
  buttonTitle?: string;
  hasButton?: boolean;
  customContent?: ReactNode;
}

export interface BottomSheetHandle {
  open: () => void;
  close: () => void;
}

export const BottomSheet = forwardRef<BottomSheetHandle, BottomSheetProps>(
  ({ title, desc, buttonTitle = '확인', customContent, hasButton = false }, ref) => {
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
      <StyledBottomSheet ref={dialogRef}>
        <Column gap="XL" className="container">
          <Column className="content">
            {!!customContent ? (
              <>{customContent}</>
            ) : (
              <>
                <Typo type="HEADING_SM" className="title">
                  {title}
                </Typo>
                <Typo type="BODY_SM" className="desc">
                  {desc}
                </Typo>
              </>
            )}
          </Column>
          {hasButton && (
            <Button
              size="large"
              onClick={() => {
                closeHandler();
              }}
              row
            >
              {buttonTitle}
            </Button>
          )}
        </Column>
      </StyledBottomSheet>
    );
  },
);
