import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
    }),
  ],

  build: {
    lib: {
      entry: [resolve(__dirname, 'index.js')],
      name: 'MjszVbrElementsShared',
      fileName: 'index',
      formats: ['es'],
    },
    outDir: resolve(__dirname, 'dist/icons'),
    watch: {
      include: [resolve(__dirname, 'assets/icons')],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        chunkFileNames: '[name].js',
      },
    },
  },
});
