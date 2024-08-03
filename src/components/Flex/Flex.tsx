import { HTMLAttributes } from 'react';
import { AppSpcing, AppSpcingKey } from 'src/styles/tokens/AppSpacing';
import styled, { css } from 'styled-components';

type FlexJustify = keyof typeof justifyMap;

type FlexAlignItems = keyof typeof alignItemsMap;

type FlexWrapItems = 'wrap' | 'no-wrap';

const justifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignItemsMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
};

const getCSSProperty = ({
  $justify = 'start',
  $alignItems = 'stretch',
  $gap = 'NONE',
  $flex = 'auto',
  $flexWrap = 'no-wrap',
}: {
  $justify?: FlexJustify;
  $alignItems?: FlexAlignItems;
  $gap?: AppSpcingKey;
  $flex?: number | 'auto' | 'none' | 'initial';
  $flexWrap?: FlexWrapItems;
}) => {
  return css`
    justify-content: ${justifyMap[$justify]};
    align-items: ${alignItemsMap[$alignItems]};
    gap: ${AppSpcing[$gap]};
    flex: ${$flex};
    flex-wrap: ${$flexWrap};
  `;
};

interface StyledFlexProps {
  $justify?: FlexJustify;
  $alignItems?: FlexAlignItems;
  $gap?: AppSpcingKey;
  $flex?: number | 'auto' | 'none' | 'initial';
  $flexWrap?: FlexWrapItems;
}

const StyledRow = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: row;
  ${(props) => getCSSProperty(props)}
`;

const StyledColumn = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: column;
  ${(props) => getCSSProperty(props)}
`;

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  justify?: FlexJustify;
  alignItems?: FlexAlignItems;
  gap?: AppSpcingKey;
  flex?: number | 'auto' | 'none' | 'initial';
  flexWrap?: FlexWrapItems;
}

export const Row = ({ children, justify, alignItems, gap, flex, flexWrap, ...props }: FlexProps) => (
  <StyledRow $justify={justify} $alignItems={alignItems} $flex={flex} $flexWrap={flexWrap} $gap={gap} {...props}>
    {children}
  </StyledRow>
);

export const Column = ({ children, justify, alignItems, gap, flex, flexWrap, ...props }: FlexProps) => (
  <StyledColumn $justify={justify} $alignItems={alignItems} $flex={flex} $flexWrap={flexWrap} $gap={gap} {...props}>
    {children}
  </StyledColumn>
);
