import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

build({
  build: {
    rollupOptions: {
      input: {
        bundle: path.resolve(__dirname, '../src/bundle.js'),
        extended: path.resolve(__dirname, '../src/bundle-extended.js'),
      },
      output: [
        {
          dir: 'dist/esm',
          format: 'esm',
        },
        {
          dir: 'dist/cjs',
          format: 'cjs',
        },
      ],
    },
  },
});
