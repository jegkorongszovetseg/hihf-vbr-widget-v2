import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { presetWind3 } from 'unocss';
import UnoCSS from 'unocss/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';

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
      '@mjsz-vbr-elements/core/columns': resolve(__dirname, '../packages/core/src/index.js'),
      '@mjsz-vbr-elements/core/constants': resolve(__dirname, '../packages/core/src/index.js'),
      '@mjsz-vbr-elements/elements': resolve(__dirname, '../packages/elements/src/index.js'),
      '@mjsz-vbr-elements/extended': resolve(__dirname, '../packages/extended/src/index.js'),
      '@mjsz-vbr-elements/liga': resolve(__dirname, '../packages/liga/src/index.js'),
      '@mjsz-vbr-elements/gamecenter': resolve(__dirname, '../packages/gamecenter/src/index.js'),
      '@mjsz-vbr-elements/shared/icons': resolve(__dirname, '../packages/shared/dist/icons/index.js'),
      // '@mjsz-vbr-elements/shared/icons/*': resolve(__dirname, '../packages/shared/dist/icons/index.js'),
    },
  },
  plugins: [
    VueRouter(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('mjsz-vbr-') || tag.startsWith('internal-'),
        },
      },
    }),
    UnoCSS({
      presets: [presetWind3()],
    }),
  ],
});
