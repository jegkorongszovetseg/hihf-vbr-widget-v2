import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: resolve(__dirname, '../'),
  base: '/widgets/stories/v2/',
  resolve: {
    alias: {
      '@mjsz-vbr-elements/core/*': resolve(__dirname, '../packages/core/src/index.js'),
      '@mjsz-vbr-elements/core/components': resolve(__dirname, '../packages/core/src/components.js'),
      '@mjsz-vbr-elements/core/composables': resolve(__dirname, '../packages/core/src/composables.js'),
      '@mjsz-vbr-elements/core/utils': resolve(__dirname, '../packages/core/src/utils.js'),
      '@mjsz-vbr-elements/core/columns': resolve(__dirname, '../packages/core/src/columns.js'),
      '@mjsz-vbr-elements/core/constants': resolve(__dirname, '../packages/core/src/constants.js'),
      '@mjsz-vbr-elements/elements': resolve(__dirname, '../packages/elements/src/index.js'),
      '@mjsz-vbr-elements/extended': resolve(__dirname, '../packages/extended/src/index.js'),
      '@mjsz-vbr-elements/liga': resolve(__dirname, '../packages/liga/src/index.js'),
      '@mjsz-vbr-elements/gamecenter': resolve(__dirname, '../packages/gamecenter/src/index.js'),
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('mjsz-vbr-'),
        },
      },
    }),
  ],
});
