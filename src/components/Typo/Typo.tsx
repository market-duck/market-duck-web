import { createElement, HTMLAttributes, ReactNode } from 'react';
import { AppTypo, AppTypoKey } from 'src/styles/tokens/AppTypo';
import { RuleSet, styled } from 'styled-components';

export const DynamicTypography = styled(({ tag, children, ...props }: { tag: 'span' | 'p'; children: ReactNode }) =>
  createElement(tag, props, children),
)<{
  $type: RuleSet<object>;
  $weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  $align: 'left' | 'center' | 'right';
}>`
  ${(props) => props.$type}
  font-weight: ${({ $weight }) => $weight};
  text-align: ${({ $align }) => $align};
`;

interface OriginTypeProps {
  tag?: 'span' | 'p';
  type?: AppTypoKey;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

interface PTypeProps extends OriginTypeProps, HTMLAttributes<HTMLParagraphElement> {
  tag: 'p';
}

interface SpanTypeProps extends OriginTypeProps, HTMLAttributes<HTMLSpanElement> {
  tag: 'span';
}

type TypeProps = PTypeProps | SpanTypeProps;

export const Typo = ({
  tag = 'span',
  type = 'BODY_MD',
  children,
  weight = 500,
  align = 'left',
  ...props
}: TypeProps) => {
  return (
    <DynamicTypography tag={tag} $type={AppTypo[type]} $weight={weight} $align={align} {...props}>
      {children}
    </DynamicTypography>
  );
};
