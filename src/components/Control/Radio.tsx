import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import styled from 'styled-components';
import { InputHTMLAttributes } from 'react';

const StyledRadio = styled.input.attrs<{ $size: number }>({ type: 'radio' })`
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
`;

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  size?: number;
}

export const Radio = ({ size = 20, ...props }: RadioProps) => {
  return <StyledRadio $size={size} {...props} />;
};
