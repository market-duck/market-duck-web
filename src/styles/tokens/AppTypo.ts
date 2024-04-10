//TODO:: rem 지정해두기

const font = {
  size: {
    10: '0.625rem',
  },
  lineHeight: {},
  letterSpacing: {},
};

export const AppTypo = {
  HEADING: {
    lg: `
            font-size:${font.size[10]}
        `,
    md: ``,
    sm: ``,
  },
};

export type AppTypoKey = keyof typeof AppTypo;
