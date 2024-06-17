interface Viewport {
  [key: string]: number;
}

/**
 * @description
 * moble : < 480
 * tablet : 480 ~ 1280
 * desktop 1280 <
 */
export const breakPoints: Viewport = {
  tablet: 480,
  desktop: 1280,
} as const;

export const mediaQuery = {
  minTablet: (str: string) => `@media screen and (min-width: ${breakPoints.tablet}px) { ${str} }`,
  minDesktop: (str: string) => `@media screen and (min-width: ${breakPoints.desktop}px) { ${str} }`,
};
