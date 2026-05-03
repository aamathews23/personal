import { fileURLToPath } from 'node:url';
import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      include: ['app/components'],
      thresholds: {
        branches: 20,
        functions: 20,
        lines: 20,
        statements: 20,
      },
      reporter: ['text', 'json-summary', 'json'],
      reportOnFailure: true,
    },
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
});
