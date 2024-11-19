import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { MouseEventHandler, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { AppColor, AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const StyledBottomSheet = styled.div`
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
    width: 100%;
    max-width: 768px;
    background-color: ${AppColor.WHITE.hex};
    border: none;
    border-radius: ${AppRadii.L} ${AppRadii.L} ${AppRadii.NONE} ${AppRadii.NONE};
    padding: 0;
    bottom: 0;
    margin: auto auto 0;
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
  id: string;
  title?: string;
  desc?: string;
  buttonTitle?: string;
  hasButton?: boolean;
  customContent?: ReactNode;
}

export const BottomSheet = forwardRef(
  ({ id, title, desc, buttonTitle = '확인', customContent, hasButton = false }: BottomSheetProps, ref) => {
    const { close } = useDialog();
    const closeHandler: MouseEventHandler = (e) => {
      e.preventDefault();
      close(id);
    };
    const bottomSheetRef = useRef(null);
    useImperativeHandle(ref, () => bottomSheetRef.current);

    return (
      <StyledBottomSheet onClick={closeHandler}>
        <div className="container">
          <Column gap="XL" className="container">
            <Column className="content">
              {!!customContent ? (
                <>{customContent}</>
              ) : (
                <>
                  <Typo tag="p" type="HEADING_SM" className="title">
                    {title}
                  </Typo>
                  <Typo tag="p" type="BODY_SM" className="desc">
                    {desc}
                  </Typo>
                </>
              )}
            </Column>
            {hasButton && (
              <Button size="large" onClick={closeHandler} row>
                {buttonTitle}
              </Button>
            )}
          </Column>
        </div>
      </StyledBottomSheet>
    );
  },
);
