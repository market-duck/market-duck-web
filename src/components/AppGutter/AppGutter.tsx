import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { LayoutVariables } from 'src/styles/variables/LayoutVariables';
import styled from 'styled-components';

export const AppGutter = styled.div.attrs<{
  $backgroundColor?: string;
  $transparent?: boolean;
  $padding?: string;
}>(({ $transparent, $backgroundColor, $padding }) => {
  return {
    style: {
      backgroundColor: $transparent ? 'transparent' : $backgroundColor,
      padding: $padding,
    },
  };
})`
  background-color: #fff;
  min-width: var(${LayoutVariables.viewMinWidth});
  max-width: var(${LayoutVariables.viewMaxWidth});
  margin: 0 auto;
  padding: 0 var(${LayoutVariables.gutterSize}) ${AppSpcing.XXXXL};
`;

export const AppGutterPadding = styled.div`
  padding: 0 1rem;
`;
