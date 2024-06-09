import React from 'react';
import type { Preview } from '@storybook/react';
import { AppResetStyle } from '../src/styles/tokens/Reset.style';
import { RecoilRoot } from 'recoil';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <>
      <AppResetStyle />
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </>
  ),
];

export default preview;
