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
  min-width: 375px;
  max-width: 768px;
  margin: 0 auto;
  padding: 0 1rem;
`;
export const AppGutterPadding = styled.div`
  padding: 0 1rem;
`;
