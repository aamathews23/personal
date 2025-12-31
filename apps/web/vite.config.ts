import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import { cloudflareDevProxyVitePlugin } from '@react-router/cloudflare';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { getLoadContext } from './load-context';
import tailwindcss from '@tailwindcss/vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin({
      getLoadContext,
    }),
    reactRouter(),
    tsconfigPaths(),
    tailwindcss(),
    wasm(),
    topLevelAwait(),
  ],
  ssr: {
    resolve: {
      conditions: ['workerd', 'worker', 'browser'],
    },
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@styles': path.resolve(__dirname, './styles'),
    },
  },
  build: {
    minify: true,
  },
  optimizeDeps: {
    exclude: ['@aamathews23/battleship-web'],
  },
});
