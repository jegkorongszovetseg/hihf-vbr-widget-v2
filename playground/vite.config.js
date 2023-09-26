import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import UnoCSS from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetWind from '@unocss/preset-wind';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5134,
  },
  envDir: resolve(__dirname, '../'),
  resolve: {
    alias: {
      '@mjsz-vbr-elements/core/*': resolve(__dirname, '../packages/core/src/index.js'),
      '@mjsz-vbr-elements/core/components': resolve(__dirname, '../packages/core/src/index.js'),
      '@mjsz-vbr-elements/core/composables': resolve(__dirname, '../packages/core/src/index.js'),
      '@mjsz-vbr-elements/core/utils': resolve(__dirname, '../packages/core/src/index.js'),
      '@mjsz-vbr-elements/elements': resolve(__dirname, '../packages/elements/src/index.js'),
      '@mjsz-vbr-elements/extended': resolve(__dirname, '../packages/extended/src/index.js'),
    },
  },
  plugins: [
    VueRouter(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('mjsz-vbr-'),
        },
      },
    }),
    UnoCSS({
      presets: [presetUno(), presetWind()],
    }),
  ],
});
