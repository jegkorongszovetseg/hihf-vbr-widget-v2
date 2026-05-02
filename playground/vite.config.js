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
    alias: [
      { find: /^@mjsz-vbr-elements\/core$/, replacement: resolve(__dirname, '../packages/core/src/index.js') },
      { find: '@mjsz-vbr-elements/core/components', replacement: resolve(__dirname, '../packages/core/src/index.js') },
      { find: '@mjsz-vbr-elements/core/composables', replacement: resolve(__dirname, '../packages/core/src/index.js') },
      { find: '@mjsz-vbr-elements/core/utils', replacement: resolve(__dirname, '../packages/core/src/index.js') },
      { find: '@mjsz-vbr-elements/core/columns', replacement: resolve(__dirname, '../packages/core/src/index.js') },
      { find: '@mjsz-vbr-elements/core/constants', replacement: resolve(__dirname, '../packages/core/src/index.js') },
      { find: '@mjsz-vbr-elements/core/props', replacement: resolve(__dirname, '../packages/core/src/index.js') },
      { find: '@mjsz-vbr-elements/elements', replacement: resolve(__dirname, '../packages/elements/src/index.js') },
      { find: '@mjsz-vbr-elements/extended', replacement: resolve(__dirname, '../packages/extended/src/index.js') },
      { find: '@mjsz-vbr-elements/liga', replacement: resolve(__dirname, '../packages/liga/src/index.js') },
      { find: '@mjsz-vbr-elements/gamecenter', replacement: resolve(__dirname, '../packages/gamecenter/src/index.js') },
      { find: '@mjsz-vbr-elements/shared/icons', replacement: resolve(__dirname, '../packages/shared/dist/icons/index.js') },
      { find: '@mjsz-vbr-elements/internal', replacement: resolve(__dirname, '../packages/internal/src/index.js') },
    ],
  },
  plugins: [
    VueRouter(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('mjsz-') || tag.startsWith('internal-'),
        },
      },
    }),
    UnoCSS({
      presets: [presetWind3()],
    }),
  ],
});
