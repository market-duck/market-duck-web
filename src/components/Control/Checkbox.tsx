import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import styled from 'styled-components';
import check from '@market-duck/assets/images/check.svg';
import { InputHTMLAttributes } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';

const StyledCheckbox = styled.input.attrs<{ $size: 's' | 'm' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
    type: 'checkbox',
  };
})`
  appearance: none;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  border-radius: ${AppRadii.S};
  &:checked {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY.hex};
    background-image: url(${check});
    background-position: center;
    background-repeat: no-repeat;
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

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  $size: 's' | 'm';
  children?: string;
}

export const Checkbox = ({ $size, children, ...props }: CheckboxProps) => {
  return (
    <Label $size={$size}>
      <StyledCheckbox $size={$size} {...props} />
      <span>{children}</span>
    </Label>
  );
};
