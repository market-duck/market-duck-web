import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';

const StyledRadio = styled.input.attrs<{ $size: 's' | 'm' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
    type: 'radio',
  };
})`
  appearance: none;
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  border-radius: ${AppRadii.CIRCLE};
  &:checked {
    border: 1px solid ${AppSemanticColor.BORDER_PRIMARY.hex};
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: calc(100% - 5px);
      height: calc(100% - 5px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY.hex};
      border-radius: ${AppRadii.CIRCLE};
    }
  }

  &.size-s {
    width: 20px;
    height: 20px;
  }

  &.size-m {
    width: 24px;
    height: 24px;
  }
`;

const Label = styled.label.attrs<{ $size: 's' | 'm' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
  };
})`
  display: inline-flex;
  gap: ${AppSpcing.XS};
  color: ${AppSemanticColor};

  &.size-s {
    font-weight: 500;
    ${AppTypo.BODY_SM}
  }

  &.size-m {
    font-weight: 500;
    ${AppTypo.BODY_MD}
  }
`;

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  $size: 's' | 'm';
  children?: string;
}

export const Radio = ({ $size, children, ...props }: RadioProps) => {
  return (
    <Label $size={$size}>
      <StyledRadio $size={$size} {...props} />
      <span>{children}</span>
    </Label>
  );
};
