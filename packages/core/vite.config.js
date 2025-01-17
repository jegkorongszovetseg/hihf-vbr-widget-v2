import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: resolve(__dirname, '../../'),
  plugins: [
    vue(),
    banner({
      content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version} - ${new Date().toLocaleString(
        'en-GB',
      )}\n * (c) ${new Date().getFullYear()}\n * description: ${pkg.description}\n * author: ${pkg.author}\n */`,
    }),
  ],

  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/index.js'),
        resolve(__dirname, 'src/components.js'),
        resolve(__dirname, 'src/composables.js'),
        resolve(__dirname, 'src/utils.js'),
        resolve(__dirname, 'src/columns.js'),
        resolve(__dirname, 'src/constants.js'),
      ],
      formats: ['es'],
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

  test: {
    environment: 'happy-dom',
  },
});
