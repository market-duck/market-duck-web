import { AppSpcing, AppSpcingKey } from 'src/styles/tokens/AppSpacing';
import styled, { css } from 'styled-components';

export const justifyStart = `
  justify-content: flex-start;
`;
export const justifyEnd = `
  justify-content: flex-end;
`;
export const justifyCenter = `
  justify-content: center;
`;
export const justifyBetween = `
  justify-content: space-between;
`;
export const justifyAround = `
  justify-content: space-around;
`;
export const justifyEvenly = `
  justify-content: space-evenly;
`;

export const alignItemsStart = `
  align-items: flex-start;
`;
export const alignItemsEnd = `
  align-items: flex-end;
`;
export const alignItemsCenter = `
  align-items: center;
`;
export const alignItemsStretch = `
  align-items: stretch;
`;

export type FlexJustify =
  | typeof justifyStart
  | typeof justifyEnd
  | typeof justifyCenter
  | typeof justifyBetween
  | typeof justifyAround
  | typeof justifyEvenly;

export type FlexAlignItems =
  | typeof alignItemsStart
  | typeof alignItemsEnd
  | typeof alignItemsCenter
  | typeof alignItemsStretch;

export type FlexWrapItems = 'wrap' | 'no-wrap';

interface FlexProps {
  justify?: FlexJustify;
  alignItems?: FlexAlignItems;
  gap?: AppSpcingKey;
  flex?: number | 'auto' | 'none' | 'initial';
  flexWrap?: FlexWrapItems;
}

const getCSSProperty = ({
  justify = justifyStart,
  alignItems = alignItemsStretch,
  gap = 'NONE',
  flex = 'auto',
  flexWrap = 'no-wrap',
}: FlexProps) => {
  return css`
    ${justify ?? ''}
    ${alignItems ?? ''}
      gap: ${AppSpcing[gap]};
    flex: ${flex ?? 'auto'};
    flex-wrap: ${flexWrap};
  `;
};

export const Row = styled.div<FlexProps>`
  display: flex;
  flex-direction: row;
  ${(props) => getCSSProperty(props)}
`;

export const Column = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  ${(props) => getCSSProperty(props)}
`;
