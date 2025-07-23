import { HTMLAttributes } from 'react';
import { AppSpacing, AppSpacingKey } from 'src/styles/tokens/AppSpacing';
import styled, { css } from 'styled-components';

type FlexJustify = keyof typeof justifyMap;

type FlexAlignItems = keyof typeof alignItemsMap;

type FlexWrapItems = 'wrap' | 'nowrap';

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
  $flex = 'initial',
  $flexWrap = 'nowrap',
}: {
  $justify?: FlexJustify;
  $alignItems?: FlexAlignItems;
  $gap?: AppSpacingKey;
  $flex?: number | 'auto' | 'none' | 'initial';
  $flexWrap?: FlexWrapItems;
}) => {
  return css`
    justify-content: ${justifyMap[$justify]};
    align-items: ${alignItemsMap[$alignItems]};
    gap: ${AppSpacing[$gap]};
    flex: ${$flex};
    flex-wrap: ${$flexWrap};
  `;
};

interface StyledFlexProps {
  $justify?: FlexJustify;
  $alignItems?: FlexAlignItems;
  $gap?: AppSpacingKey;
  $flex?: number | 'auto' | 'none' | 'initial';
  $flexWrap?: FlexWrapItems;
  $reverse?: boolean;
}

const StyledRow = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
  ${(props) => getCSSProperty(props)}
`;

const StyledColumn = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${({ $reverse }) => ($reverse ? 'column-reverse' : 'column')};
  ${(props) => getCSSProperty(props)}
`;

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  justify?: FlexJustify;
  alignItems?: FlexAlignItems;
  gap?: AppSpacingKey;
  flex?: number | 'auto' | 'none' | 'initial';
  flexWrap?: FlexWrapItems;
  reverse?: boolean;
}

export const Row = ({ children, justify, alignItems, gap, flex, flexWrap, reverse, ...props }: FlexProps) => (
  <StyledRow
    $justify={justify}
    $alignItems={alignItems}
    $flex={flex}
    $flexWrap={flexWrap}
    $gap={gap}
    $reverse={reverse}
    {...props}
  >
    {children}
  </StyledRow>
);

export const Column = ({ children, justify, alignItems, gap, flex, flexWrap, reverse, ...props }: FlexProps) => (
  <StyledColumn
    $justify={justify}
    $alignItems={alignItems}
    $flex={flex}
    $flexWrap={flexWrap}
    $gap={gap}
    $reverse={reverse}
    {...props}
  >
    {children}
  </StyledColumn>
);
