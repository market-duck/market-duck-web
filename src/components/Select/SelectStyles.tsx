import { Column } from '@market-duck/components/Flex/Flex';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

export const ContainerWrap = styled(Column)`
  position: relative;
  width: 100%;
  gap: ${AppSpcing.XS};
  font-weight: 500;
  ${AppTypo.BODY_MD};
`;

export const UpperArea = styled.div`
  width: 100%;
  .input-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid ${AppSemanticColor.BORDER_TERTIARY};
    padding: ${AppSpcing.XXS};
    background-color: ${AppSemanticColor.BG_PRIMARY};
    border-radius: ${AppRadii.M};
    ${AppTypo.BODY_MD};
    cursor: pointer;
  }
`;

export const LowerArea = styled.ul`
  position: absolute;
  bottom: -7.5rem;
  left: 0;
  width: 100%;
  overflow-y: scroll;
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY};
  padding: ${AppSpcing.XS} 0;
  background-color: ${AppSemanticColor.BG_PRIMARY};
  border-radius: ${AppRadii.M};
`;

export const OptionWrap = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: ${AppSpcing.XXS};
  background-color: ${AppSemanticColor.BG_PRIMARY};
  border-radius: ${AppRadii.M};
  cursor: pointer;
`;
