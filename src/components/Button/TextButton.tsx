import { ButtonHTMLAttributes, createElement } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';
import * as FillIcon from '@heroicons/react/24/solid';
import * as OutlineIcon from '@heroicons/react/24/outline';

const TextButtonWrap = styled.button.attrs<{ $variant: 'primary' | 'secondary' }>(({ $variant }) => {
  return {
    className: `${$variant}`,
  };
})`
  background: transparent;

  &.primary {
    color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.hex};

    &:hover {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY_HOVER.hex};
    }
    &:active {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY_PRESS.hex};
    }
  }

  &.secondary {
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};

    &:hover {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY_HOVER.hex};
    }
    &:active {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY_PRESS.hex};
    }
  }

  &:disabled {
    color: ${AppSemanticColor.TEXT_DISABLED.hex};
  }

  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;

interface TextButtonProps {
  variant: 'primary' | 'secondary';
  leftIcon?: keyof typeof OutlineIcon;
  rightIcon?: keyof typeof OutlineIcon;
  iconFill?: boolean;
}

export const TextButton = ({
  variant,
  leftIcon,
  rightIcon,
  iconFill,
  children,
  ...props
}: TextButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const IconSet = iconFill ? FillIcon : OutlineIcon;

  return (
    <TextButtonWrap $variant={variant} {...props}>
      <>
        {leftIcon && createElement(IconSet[leftIcon])}
        {children}
        {rightIcon && createElement(IconSet[rightIcon])}
      </>
    </TextButtonWrap>
  );
};
