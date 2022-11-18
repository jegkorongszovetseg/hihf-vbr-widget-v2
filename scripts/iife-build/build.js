import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
const externalId = fileURLToPath(new URL('./shared.js', import.meta.url));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

await build({
  build: {
    lib: {
      entry: path.resolve(__dirname, './shared.js'),
      name: 'shared',
      fileName: (format) => `mjsz-vbr-widget.${format}.js`,
      formats: ['iife'],
    },
    rollupOptions: {
      // input: path.resolve(__dirname, './shared.js'),

      external: ['vue'],
      output: {
        dir: 'build',
        // name: 'shared',
        // format: 'iife',
        globals: {
          vue: 'Vue',
        },
      },
    },
    emptyOutDir: false,
    sourcemap: false,
    target: 'modules',
    minify: false,
  },
});

await build({
  build: {
    lib: {
      entry: path.resolve(__dirname, './base.js'),
      name: 'base',
      fileName: (format) => `mjsz-vbr-base.${format}.js`,
      formats: ['iife'],
    },
    rollupOptions: {
      external: [externalId],
      output: {
        dir: 'build',
        globals: {
          [externalId]: 'shared',
        },
      },
    },
    emptyOutDir: false,
    sourcemap: false,
    target: 'modules',
    minify: false,
  },
});
