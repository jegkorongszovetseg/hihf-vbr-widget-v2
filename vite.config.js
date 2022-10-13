import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import versionInjector from 'rollup-plugin-version-injector';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  build: {
    lib: {
      entry: 'src/bundle.js',
      name: 'MjszVbrWidget',
      fileName: 'bundle',
      formats: ['es', 'umd', 'iife'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [versionInjector()],
    },
    sourcemap: false,
    target: 'modules',
    minify: true,
  },
  plugins: [
    vue({
      reactivityTransform: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.includes('vbr-');
          },
        },
      },
    }),
  ],
});
