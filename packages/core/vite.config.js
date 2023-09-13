import { defineConfig } from 'vite';
import { resolve } from 'path';
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
    viteStaticCopy({
      targets: [
        {
          src: 'dist/mjsz-vbr-elements-core.global.js',
          dest: resolve(__dirname, '../../build'),
        },
        // {
        //   src: 'dist/mjsz-vbr-elements-core.global.js.gz',
        //   dest: resolve(__dirname, '../../build'),
        // },
        // {
        //   src: 'dist/mjsz-vbr-elements-core.global.js.br',
        //   dest: resolve(__dirname, '../../build'),
        // },
      ],
    }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MjszVbrElementsCore',
      fileName: (format) => `mjsz-vbr-elements-core.${BUILD_FORMATS.get(format)}.js`,
      formats: ['es', 'iife'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
