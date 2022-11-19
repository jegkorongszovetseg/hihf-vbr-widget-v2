import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
const externalId = fileURLToPath(new URL('../../src/components/shared/index.js', import.meta.url));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  build: {
    lib: {
      entry: path.resolve(__dirname, '../../src/components/shared/index.js'),
      name: 'Shared',
      fileName: (format) => `mjsz-vbr-shared.${format}.js`,
      formats: ['iife'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        dir: 'build',
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: false,
    target: 'modules',
    minify: false,
  },
});

await build({
  build: {
    lib: {
      entry: path.resolve(__dirname, './base.js'),
      name: 'Widgets',
      fileName: (format) => `mjsz-vbr-widgets.${format}.js`,
      formats: ['iife'],
    },
    rollupOptions: {
      external: ['vue', '@shared'],
      output: {
        dir: 'build',
        globals: {
          vue: 'Vue',
          // [externalId]: 'Shared',
          ['@shared']: 'Shared',
        },
      },
    },
    emptyOutDir: false,
    sourcemap: false,
    target: 'modules',
    minify: false,
  },
});
