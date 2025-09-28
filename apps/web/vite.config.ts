import { defineConfig } from 'vite';
import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { getLoadContext } from './load-context';
import tailwindcss from '@tailwindcss/vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

declare module '@remix-run/cloudflare' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    cloudflareDevProxyVitePlugin({
      getLoadContext,
    }),
    !process.env.VITEST &&
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_singleFetch: true,
          v3_lazyRouteDiscovery: true,
        },
      }),
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
