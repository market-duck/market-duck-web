import { styled } from 'styled-components';
import { createElement } from 'react';
import { AppTypo, AppTypoKey } from 'src/styles/tokens/AppTypo';

export const DynamicTypography = styled(({ tag, children, ...props }: { tag: 'span' | 'p'; children: string }) =>
  createElement(tag, props, children),
)<{ size: string }>`
  ${(props) => props.size}
`;

interface TypoProps {
  tag?: 'span' | 'p';
  type?: AppTypoKey;
  size?: 'lg' | 'md' | 'sm';
  children: string;
  className?: string;
}

export const Typo = ({ tag = 'span', type = 'HEADING', size = 'lg', children, ...props }: TypoProps) => {
  return (
    <DynamicTypography tag={tag} size={AppTypo[type][size]} {...props}>
      {children}
    </DynamicTypography>
  );
};
