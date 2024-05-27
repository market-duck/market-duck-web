import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import styled from 'styled-components';
import check from '@market-duck/assets/images/check.svg';
import { InputHTMLAttributes } from 'react';

const StyledCheckbox = styled.input.attrs<{ $size: number }>({ type: 'checkbox' })`
  appearance: none;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  border-radius: ${AppRadii.S};
  &:checked {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY.hex};
    background-image: url(${check});
    background-position: center;
    background-repeat: no-repeat;
  }
`;

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: number;
}

export const Checkbox = ({ size = 20 }: CheckboxProps) => {
  return <StyledCheckbox $size={size} />;
};
