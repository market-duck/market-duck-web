import { css } from 'styled-components';

export const AppElevation = {
  SHADOW2: css`
    box-shadow:
      0px 1px 2px 0px rgba(0, 0, 0, 0.16),
      0px 0px 1px 0px rgba(0, 0, 0, 0.12);
  `,
  SHADOW4: css`
    box-shadow:
      0px 2px 4px 0px rgba(0, 0, 0, 0.16),
      0px 0px 2px 0px rgba(0, 0, 0, 0.12);
  `,
  SHADOW8: css`
    box-shadow:
      0px 4px 8px 0px rgba(0, 0, 0, 0.16),
      0px 0px 4px 0px rgba(0, 0, 0, 0.12);
  `,
  SHADOW16: css`
    box-shadow:
      0px 8px 16px 0px rgba(0, 0, 0, 0.16),
      0px 0px 8px 0px rgba(0, 0, 0, 0.12);
  `,
};
