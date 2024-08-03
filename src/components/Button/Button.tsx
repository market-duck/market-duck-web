import { ButtonHTMLAttributes, createElement } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled, { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';
import * as FillIcon from '@heroicons/react/24/solid';
import * as OutlineIcon from '@heroicons/react/24/outline';

interface CssObjectType {
  [key: string]: RuleSet<object>;
}

//* size
const size: CssObjectType = {
  large: css`
    padding: ${AppSpcing.S} ${AppSpcing.XL};
    gap: ${AppSpcing.XS};
    border-radius: ${AppRadii.M};
    font-weight: 500;
    ${AppTypo.BODY_LG}
  `,

  medium: css`
    padding: ${AppSpcing.XS} ${AppSpcing.L};
    gap: ${AppSpcing.XS};
    border-radius: ${AppRadii.S};
    font-weight: 500;
    ${AppTypo.BODY_MD}
  `,

  small: css`
    padding: ${AppSpcing.XS} ${AppSpcing.M};
    gap: ${AppSpcing.XXS};
    border-radius: ${AppRadii.S};
    font-weight: 500;
    ${AppTypo.BODY_SM}
  `,
};

type sizeType = 'large' | 'medium' | 'small';

//* variant
export type buttonVariantType = 'primary' | 'secondary' | 'text';

const variant: CssObjectType = {
  primary: css`
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY.hex};
    color: ${AppSemanticColor.TEXT_INVERSE.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY_HOVER.hex};
    }
    &:active {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY_PRESS.hex};
    }
    &:disabled {
      color: ${AppSemanticColor.TEXT_DISABLED.hex};
      background-color: ${AppSemanticColor.BG_DISABLED.hex};
    }
  `,

  secondary: css`
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_HOVER.hex};
    }
    &:active {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_PRESS.hex};
    }
    &:disabled {
      color: ${AppSemanticColor.TEXT_DISABLED.hex};
      background-color: ${AppSemanticColor.BG_DISABLED.hex};
    }
  `,

  text: css`
    color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.hex};
    &:hover {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY_HOVER.hex};
    }
    &:active {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.hex};
    }
  `,
};

//* row

const rowCSSProperty = css`
  width: 100%;
  flex: 1;
`;

interface StyledButtonProps {
  $size?: sizeType;
  $variant?: buttonVariantType;
  $row?: boolean;
}

const getCSSProperty = ({
  $size: sizeType = 'medium',
  $variant: variantType = 'primary',
  $row: row = false,
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
  align-items: center;
  outline: none;
  cursor: pointer;
  ${(props) => getCSSProperty(props)}
  .contentContainer {
  }
  & > svg {
    width: 24px;
    height: 24px;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: keyof typeof OutlineIcon;
  rightIcon?: keyof typeof OutlineIcon;
  iconFill?: boolean;
  size?: sizeType;
  variant?: buttonVariantType;
  row?: boolean;
}

export const Button = ({ leftIcon, rightIcon, size, variant, iconFill, row, children, ...props }: ButtonProps) => {
  const IconSet = iconFill ? FillIcon : OutlineIcon;

  return (
    <StyledButton $size={size} $variant={variant} $row={row} {...props}>
      <>
        {leftIcon && createElement(IconSet[leftIcon])}
        {children}
        {rightIcon && createElement(IconSet[rightIcon])}
      </>
    </StyledButton>
  );
};
