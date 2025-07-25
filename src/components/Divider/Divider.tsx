import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${AppSemanticColor.BG_SECONDARY.hex};
`;
