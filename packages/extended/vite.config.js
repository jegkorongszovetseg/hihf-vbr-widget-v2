import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import banner from 'vite-plugin-banner';
import copy from 'rollup-plugin-copy';
import { BUILD_FORMATS, compressConfig } from '../build';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version} - ${new Date().toLocaleString(
        'en-GB'
      )}\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    ...compressConfig,
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MjszVbrElementsExtended',
      fileName: (format) => `mjsz-vbr-elements-extended.${BUILD_FORMATS.get(format)}.js`,
      formats: ['es', 'iife'],
    },
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: 'dist/mjsz-vbr-elements-extended.global.js', dest: '../../build' },
            { src: 'dist/mjsz-vbr-elements-extended.global.js.gz', dest: '../../build' },
            { src: 'dist/mjsz-vbr-elements-extended.global.js.br', dest: '../../build' },
          ],
        }),
      ],
      external: ['vue', '@mjsz-vbr-elements/core'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@mjsz-vbr-elements/core': 'MjszVbrElementsCore',
        },
      },
    },
  },
});
