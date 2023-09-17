import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import banner from 'vite-plugin-banner';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { BUILD_FORMATS, compressConfig } from '../build';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ['@mjsz-vbr-elements/shared'],
  },

  plugins: [
    vue(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version} - ${new Date().toLocaleString(
        'en-GB'
      )}\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    // ...compressConfig,
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'dist/index.iife.js',
    //       dest: resolve(__dirname, '../../build'),
    //       rename: 'extended.global.js',
    //     },
    //   ],
    // }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MjszVbrElementsExtended',
      fileName: 'index',
      // fileName: (format) => `mjsz-vbr-elements-extended.${BUILD_FORMATS.get(format)}.js`,
      formats: ['es', 'iife'],
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
