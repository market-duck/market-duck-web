import { Typo } from '@market-duck/components/Typo/Typo';
import { HTMLAttributes } from 'react';
import { AppColor, AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypoKey } from 'src/styles/tokens/AppTypo';
import styled, { css, RuleSet } from 'styled-components';

type badgeSize = 'lg' | 'md' | 'sm';
type badgeVariant = 'danger' | 'primary' | 'info';

interface CssObjectType {
  [key: string]: RuleSet<object>;
}

const variant: CssObjectType = {
  primary: css`
    background-color: ${AppSemanticColor.BG_SUCCESS.hex};
  `,

  danger: css`
    background-color: ${AppSemanticColor.BG_DANGER.hex};
  `,

  info: css`
    background-color: ${AppSemanticColor.BG_INFO.hex};
  `,
};

const size: CssObjectType = {
  lg: css`
    min-width: ${AppSpcing.XL};
  `,

  md: css`
    min-width: ${AppSpcing.L};
  `,

  sm: css``,
};

interface StyledBadgeProps {
  $size: badgeSize;
  $variant: badgeVariant;
}

const getCSSProperty = ({ $variant: variantType = 'primary', $size: sizeType = 'lg' }: StyledBadgeProps) => {
  return css`
    ${variant[variantType] ?? ''}
    ${size[sizeType] ?? ''}
  `;
};

const StyledBadge = styled.span<StyledBadgeProps>`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: ${AppSpcing.XXS};
  border-radius: ${AppRadii.CIRCLE};
  color: ${AppSemanticColor.TEXT_INVERSE.hex};

  ${(props) => getCSSProperty(props)}
`;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size: badgeSize;
  variant: badgeVariant;
  children: string;
}

export const Badge = ({ size, variant, children, ...props }: BadgeProps) => {
  const sizeString: { [key: string]: AppTypoKey } = { lg: 'CAPTION_MD', md: 'CAPTION_SM' };
  return (
    <StyledBadge $variant={variant} $size={size} {...props}>
      {size !== 'sm' ? (
        <Typo tag="span" type={sizeString[size] ?? undefined}>
          {children}
        </Typo>
      ) : (
        ''
      )}
    </StyledBadge>
  );
};
