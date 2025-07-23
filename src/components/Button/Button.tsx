import * as OutlineIcon from '@heroicons/react/24/outline';
import * as FillIcon from '@heroicons/react/24/solid';
import { ButtonHTMLAttributes, createElement } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled, { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';

interface CssObjectType {
  [key: string]: RuleSet<object>;
}

//* size
const size: CssObjectType = {
  large: css`
    padding: ${AppSpacing.S} ${AppSpacing.XL};
    gap: ${AppSpacing.XS};
    border-radius: ${AppRadii.L};
    font-weight: 600;
    ${AppTypo.BODY_MD}
    & > svg {
      width: 24px;
      height: 24px;
    }
  `,

  medium: css`
    padding: calc(${AppSpacing.XS} + 2px) ${AppSpacing.L};
    gap: ${AppSpacing.XS};
    border-radius: ${AppRadii.M};
    font-weight: 600;
    ${AppTypo.BODY_SM}
    & > svg {
      width: 18px;
      height: 18px;
    }
  `,

  small: css`
    padding: ${AppSpacing.XXS} ${AppSpacing.XS};
    gap: ${AppSpacing.XXS};
    border-radius: ${AppRadii.M};
    font-weight: 500;
    ${AppTypo.CAPTION_MD}
    & > svg {
      width: 16px;
      height: 16px;
    }
  `,
};

type sizeType = 'large' | 'medium' | 'small';

//* variant
export type ButtonVariantType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'text';

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
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};
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

  tertiary: css`
    border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    &:hover {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY_HOVER.hex};
    }
    &:active {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY_PRESS.hex};
    }
    &:disabled {
      color: ${AppSemanticColor.TEXT_DISABLED.hex};
      background-color: ${AppSemanticColor.BG_DISABLED.hex};
    }
  `,

  danger: css`
    border: 1px solid ${AppSemanticColor.BORDER_DANGER.hex};
    color: ${AppSemanticColor.TEXT_DANGER.hex};
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER.hex};
    }
    &:active {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER.hex};
    }
    &:disabled {
      border: 1px solid ${AppSemanticColor.BORDER_DISABLED.hex};
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
  $variant?: ButtonVariantType;
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
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: keyof typeof OutlineIcon;
  rightIcon?: keyof typeof OutlineIcon;
  iconFill?: boolean;
  size?: sizeType;
  variant?: ButtonVariantType;
  row?: boolean;
  outline?: boolean;
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
