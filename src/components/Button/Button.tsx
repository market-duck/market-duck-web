import { ButtonHTMLAttributes } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled, { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';

interface CssObjectType {
  [key: string]: RuleSet<object>;
}

//* size
const size: CssObjectType = {
  large: css`
    padding: ${AppSpcing.S} ${AppSpcing.XL};
    gap: ${AppSpcing.XS};
    border-radius: ${AppRadii.L};
    font-weight: 500;
    ${AppTypo.BODY_LG}
  `,

  medium: css`
    padding: ${AppSpcing.XS} ${AppSpcing.L};
    gap: ${AppSpcing.XS};
    border-radius: ${AppRadii.M};
    font-weight: 500;
    ${AppTypo.BODY_MD}
  `,

  small: css`
    padding: ${AppSpcing.XS} ${AppSpcing.M};
    gap: ${AppSpcing.XXS};
    border-radius: ${AppRadii.M};
    font-weight: 500;
    ${AppTypo.BODY_SM}
  `,
};

type sizeType = 'large' | 'medium' | 'small';

//* variant
type variantType = 'primary' | 'secondary' | 'text';

const variant: CssObjectType = {
  primary: css`
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY};
    color: ${AppSemanticColor.TEXT_INVERSE};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY_HOVER};
    }
    &:active {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY_PRESS};
    }
    &:disabled {
      color: ${AppSemanticColor.TEXT_DISABLED};
      background-color: ${AppSemanticColor.BG_DISABLED};
    }
  `,

  secondary: css`
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY};
    color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_HOVER};
    }
    &:active {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_PRESS};
    }
    &:disabled {
      color: ${AppSemanticColor.TEXT_DISABLED};
      background-color: ${AppSemanticColor.BG_DISABLED};
    }
  `,

  text: css`
    color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY};
    &:hover {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY_HOVER};
    }
    &:active {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY};
    }
  `,
};

//* row

const rowCSSProperty = css`
  width: 100%;
  flex: 1;
  ${size.large}
`;

interface StyledButtonProps {
  size?: sizeType;
  variant?: variantType;
  row?: boolean;
}

const getCSSProperty = ({
  size: sizeType = 'medium',
  variant: variantType = 'primary',
  row = false,
}: StyledButtonProps) => {
  return css`
    ${size[sizeType] ?? ''}
    ${variant[variantType] ?? ''}
    ${row && rowCSSProperty}
  `;
};

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  ${(props) => getCSSProperty(props)}
`;

interface ButtonProps extends StyledButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: string;
  rightIcon?: string;
}

export const Button = ({ leftIcon = '', rightIcon = '', size, variant, row, children, ...props }: ButtonProps) => {
  return (
    <StyledButton size={size} variant={variant} row={row} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </StyledButton>
  );
};
