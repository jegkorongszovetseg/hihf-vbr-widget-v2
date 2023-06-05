import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import banner from 'vite-plugin-banner';

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
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MjszVbrElements',
      fileName: 'mjsz-vbr-elements',
      formats: ['es', 'umd', 'iife'],
    },
    copyPublicDir: false,
    rollupOptions: {
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
