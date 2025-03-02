import * as OutlineIcon from '@heroicons/react/24/outline';
import * as FillIcon from '@heroicons/react/24/solid';
import { ButtonHTMLAttributes, createElement } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled, { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';

interface CssObjectType {
  [key: string]: RuleSet<object>;
}

//* variant
export type IconbuttonVariantType = 'primary' | 'secondary' | 'danger';

const variant: CssObjectType = {
  primary: css`
    color: ${AppSemanticColor.ICON_INTERACTIVE_PRIMARY.hex};
    &:hover {
      color: ${AppSemanticColor.ICON_INTERACTIVE_PRIMARY_HOVER.hex};
    }
    &:active {
      color: ${AppSemanticColor.ICON_INTERACTIVE_PRIMARY_PRESS.hex};
    }
    &:disabled {
      color: ${AppSemanticColor.ICON_DISABLED.hex};
    }
  `,

  secondary: css`
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};
    &:hover {
      color: ${AppSemanticColor.ICON_INTERACTIVE_SECONDARY_HOVER.hex};
    }
    &:active {
      color: ${AppSemanticColor.ICON_INTERACTIVE_SECONDARY_PRESS.hex};
    }
    &:disabled {
      color: ${AppSemanticColor.ICON_DISABLED.hex};
    }
  `,

  danger: css`
    color: ${AppSemanticColor.ICON_DANGER.hex};
    &:hover {
      color: ${AppSemanticColor.ICON_DANGER.hex};
    }
    &:active {
      color: ${AppSemanticColor.ICON_DANGER.hex};
    }
    &:disabled {
      color: ${AppSemanticColor.ICON_DISABLED.hex};
    }
  `,
};

interface StyledIconButtonProps {
  $variant?: IconbuttonVariantType;
  $row?: boolean;
}

const getCSSProperty = ({ $variant: variantType = 'primary' }: StyledIconButtonProps) => {
  return css`
    ${variant[variantType] ?? ''}
  `;
};

const StyledIconButton = styled.button<StyledIconButtonProps>`
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

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: keyof typeof OutlineIcon;
  iconFill?: boolean;
  variant?: IconbuttonVariantType;
  row?: boolean;
}

export const IconButton = ({ icon, variant, iconFill, ...props }: IconButtonProps) => {
  const IconSet = iconFill ? FillIcon : OutlineIcon;
  return (
    <StyledIconButton $variant={variant} {...props}>
      {createElement(IconSet[icon])}
    </StyledIconButton>
  );
};
