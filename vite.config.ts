import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['sockjs-client'],
  },
  plugins: [svgr(), react(), tsconfigPaths({ configNames: ['tsconfig.json'] })],
});
