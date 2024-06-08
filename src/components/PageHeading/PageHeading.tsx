import { ReactNode } from 'react';
import { Row, justifyBetween, justifyStart } from '../Flex/Flex';
import styled from 'styled-components';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

const PageHeadingWrap = styled(Row).attrs<{ $size: 'sm' | 'md' }>(({ $size }) => {
  return {
    className: `size-${$size}`,
  };
})`
  width: 100%;
  align-items: center;
  color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  &.size-sm {
    font-weight: 500;
    ${AppTypo.HEADING_SM};
  }

  &.size-md {
    font-weight: 500;
    ${AppTypo.HEADING_MD};
  }

  > .right {
    ${AppTypo.BODY_SM};
  }
`;

export const PageHeading = ({
  title,
  rightComponent,
  size = 'md',
}: {
  title: string;
  rightComponent?: ReactNode;
  size?: 'sm' | 'md';
}) => {
  return (
    <PageHeadingWrap $size={size} justify={rightComponent ? justifyBetween : justifyStart}>
      <span>{title}</span>
      <span className="right">{rightComponent}</span>
    </PageHeadingWrap>
  );
};
