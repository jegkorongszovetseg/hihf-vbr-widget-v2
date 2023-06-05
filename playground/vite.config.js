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
