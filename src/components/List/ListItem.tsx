import { Row } from '@market-duck/components/Flex/Flex';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

const ListItemWrap = styled(Row)`
  padding: ${AppSpcing.XS};
  border-bottom: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  cursor: pointer;

  &:hover {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
  }
`;

export const ListItem = ({
  left,
  right,
  onClick,
  align,
}: {
  left: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
  align?: 'center' | 'start' | 'end';
}) => {
  return (
    <ListItemWrap className="listItemWrap" onClick={onClick} justify="between" alignItems={align || 'center'}>
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </ListItemWrap>
  );
};
