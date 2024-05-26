import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

const StyledToggle = styled.input.attrs<{ $size: number }>({ type: 'checkbox' })`
  appearance: none;
  position: relative;
  width: ${({ $size }) => ($size / 5) * 9}px;
  height: ${({ $size }) => $size}px;
  background-color: ${AppSemanticColor.BG_DISABLED};
  border-radius: ${AppRadii.PILL};
  transition: all 0.3s ease-in-out;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: ${({ $size }) => $size - 4}px;
    height: ${({ $size }) => $size - 4}px;
    top: 50%;
    left: 2px;
    transition: all 0.3s ease-in-out;
    transform: translateY(-50%);
    background-color: ${AppSemanticColor.BG_PRIMARY};
    border-radius: ${AppRadii.CIRCLE};
  }
  &:checked {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY};
    &::after {
      left: ${({ $size }) => $size - 2}px;
    }
  }
`;

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: number;
}

export const Toggle = ({ size = 20 }: ToggleProps) => {
  return <StyledToggle $size={size} />;
};
