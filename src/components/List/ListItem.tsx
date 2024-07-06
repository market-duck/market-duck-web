import { Row } from '@market-duck/components/Flex/Flex';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';

const ListItemWrap = styled(Row)`
  justify-content: space-between;
  align-items: center;
  padding: ${AppSpcing.XS};
  border-bottom: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  cursor: pointer;

  &:hover {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
  }
`;

export const ListItem = ({ left, right, onClick }: { left: ReactNode; right?: ReactNode; onClick?: () => void }) => {
  return (
    <ListItemWrap onClick={onClick}>
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </ListItemWrap>
  );
};
