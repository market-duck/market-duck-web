import { createElement, HTMLAttributes, ReactNode } from 'react';
import { AppTypo, AppTypoKey } from 'src/styles/tokens/AppTypo';
import { RuleSet, styled } from 'styled-components';

export const DynamicTypography = styled(({ tag, children, ...props }: { tag: 'span' | 'p'; children: ReactNode }) =>
  createElement(tag, props, children),
)<{ type: RuleSet<object> }>`
  ${(props) => props.type}
`;

interface OriginTypeProps {
  tag?: 'span' | 'p';
  type?: AppTypoKey;
  className?: string;
}

interface PTypeProps extends OriginTypeProps, HTMLAttributes<HTMLParagraphElement> {
  tag: 'p';
}

interface SpanTypeProps extends OriginTypeProps, HTMLAttributes<HTMLSpanElement> {
  tag: 'span';
}

type TypeProps = PTypeProps | SpanTypeProps;

export const Typo = ({ tag = 'span', type = 'BODY_MD', children, ...props }: TypeProps) => {
  return (
    <DynamicTypography tag={tag} type={AppTypo[type]} {...props}>
      {children}
    </DynamicTypography>
  );
};
