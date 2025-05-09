import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom', 'react-dom/client', '@emotion/react', '@emotion/styled'],
  loader: {
    '.less': 'css'
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
});
