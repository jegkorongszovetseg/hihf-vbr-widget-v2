import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
import { compressConfig } from '../../compress.config';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // dedupe: ['@mjsz-vbr-elements/shared', '@mjsz-vbr-elements/shared/css/*.scss'],
    dedupe: ['@mjsz-vbr-elements/shared', '@mjsz-vbr-elements/shared/css/*.scss', '@mjsz-vbr-elements/shared/css/paginator.scss', '@mjsz-vbr-elements/shared/css/cards.scss'],
  },

  plugins: [
    vue(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version} - ${new Date().toLocaleString(
        'en-GB',
      )}\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
    ...compressConfig,
  ],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MjszVbrElementsLiga',
      fileName: 'index',
      formats: ['es', 'iife'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        'vue',
        '@mjsz-vbr-elements/core',
        '@mjsz-vbr-elements/core/utils',
        '@mjsz-vbr-elements/core/columns',
        '@mjsz-vbr-elements/core/constants',
        '@mjsz-vbr-elements/core/components',
        '@mjsz-vbr-elements/core/composables',
      ],
      output: {
        exports: 'named',
        globals: {
          'vue': 'Vue',
          '@mjsz-vbr-elements/core': 'MjszVbrElementsCore',
          '@mjsz-vbr-elements/core/utils': 'MjszVbrElementsCore',
          '@mjsz-vbr-elements/core/columns': 'MjszVbrElementsCore',
          '@mjsz-vbr-elements/core/constants': 'MjszVbrElementsCore',
          '@mjsz-vbr-elements/core/components': 'MjszVbrElementsCore',
          '@mjsz-vbr-elements/core/composables': 'MjszVbrElementsCore',
        },
      },
    },
  },
});
