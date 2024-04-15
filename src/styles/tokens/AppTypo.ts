const font = {
  size: {
    10: '0.625rem',
    50: '0.75rem',
    100: '0.875rem',
    200: '1rem',
    300: '1.125rem',
    400: '1.25rem',
    500: '1.5rem',
    600: '2rem',
  },
  lineHeight: {
    10: '0.75rem',
    50: '1rem',
    100: '1.25rem',
    200: '1.5rem',
    300: '1.75rem',
    400: '2rem',
    500: '2.25rem',
    600: '2.75rem',
  },
  letterSpacing: {
    200: '-0.02em',
    400: '-0.04em',
    0: '0', //none인데 위와 맞춰서 숫자 형태의 key로 남김
  },
  fontWeight: {
    400: '400',
    500: '500',
    600: '600',
  },
};

export const AppTypo = {
  HEADING: {
    lg: `
    font-size:${font.size[600]};
    line-height:${font.lineHeight[600]};
    letter-spacing:${font.letterSpacing[400]};
    `,
    md: `
    font-size:${font.size[500]};
    line-height:${font.lineHeight[500]};
    letter-spacing:${font.letterSpacing[400]};
        `,
    sm: `
    font-size:${font.size[400]};
    line-height:${font.lineHeight[400]};
    letter-spacing:${font.letterSpacing[200]};
    `,
  },
  BODY: {
    lg: `
    font-size:${font.size[300]};
    line-height:${font.lineHeight[300]};
    letter-spacing:${font.letterSpacing[200]};
    `,
    md: `
    font-size:${font.size[200]};
    line-height:${font.lineHeight[200]};
    letter-spacing:${font.letterSpacing[200]};`,
    sm: `
    font-size:${font.size[100]};
    line-height:${font.lineHeight[100]};
    letter-spacing:${font.letterSpacing[200]};`,
  },
  CAPTION: {
    md: `
    font-size:${font.size[50]};
    line-height:${font.lineHeight[50]};
    letter-spacing:${font.letterSpacing[0]};`,
    sm: `
    font-size:${font.size[10]};
    line-height:${font.lineHeight[10]};
    letter-spacing:${font.letterSpacing[0]};`,
  },
};

export type AppTypoKey = keyof typeof AppTypo;
