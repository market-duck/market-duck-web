import { Column } from '@market-duck/components/Flex/Flex';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

export const ContainerWrap = styled(Column)`
  position: relative;
  width: 100%;
  gap: ${AppSpcing.XS};
  font-weight: 500;
  ${AppTypo.BODY_MD};
`;

export const UpperArea = styled.div`
  width: 100%;
`;

export const SelectInputWrap = styled.div.attrs<{ $focus: boolean; $error?: boolean; $disabled?: boolean }>(
  ({ $focus, $error, $disabled }) => {
    return {
      className: `${$focus ? 'is-focus' : ''} ${$error ? 'is-error' : ''} ${$disabled ? 'is-disabled' : ''}`,
    };
  },
)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  padding: ${AppSpcing.XXS};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  border-radius: ${AppRadii.M};
  ${AppTypo.BODY_MD};
  cursor: pointer;

  &.is-focus {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-color: ${AppSemanticColor.BORDER_FOCUS_RING.hex};
  }

  &.is-error {
    background-color: ${AppSemanticColor.BG_DANGER_SUBTLE.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-color: ${AppSemanticColor.TEXT_DANGER.hex};
  }

  &.is-disabled {
    background-color: ${AppSemanticColor.BG_DISABLED.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-color: ${AppSemanticColor.BORDER_TERTIARY.hex};
  }

  > .multi-input {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const LowerArea = styled.ul`
  position: absolute;
  left: 0;
  top: 2.5rem;
  width: 100%;
  max-height: 9rem;
  overflow-y: scroll;
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  padding: ${AppSpcing.XS} 0;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  border-radius: ${AppRadii.M};
`;

export const OptionWrap = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${AppSpcing.XXS};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  border-radius: ${AppRadii.M};
  cursor: pointer;
`;
