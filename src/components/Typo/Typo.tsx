import { RuleSet, styled } from 'styled-components';
import { createElement, ReactNode } from 'react';
import { AppTypo, AppTypoKey } from 'src/styles/tokens/AppTypo';

export const DynamicTypography = styled(({ tag, children, ...props }: { tag: 'span' | 'p'; children: ReactNode }) =>
  createElement(tag, props, children),
)<{ type: RuleSet<object> }>`
  ${(props) => props.type}
`;

interface TypoProps {
  tag?: 'span' | 'p';
  type?: AppTypoKey;
  children: string | ReactNode;
  className?: string;
}

export const Typo = ({ tag = 'span', type = 'BODY_MD', children, ...props }: TypoProps) => {
  return (
    <DynamicTypography tag={tag} type={AppTypo[type]} {...props}>
      {children}
    </DynamicTypography>
  );
};
