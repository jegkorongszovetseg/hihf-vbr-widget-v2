import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  build: {
    lib: {
      entry: 'src/bundle.js',
      name: 'bundle',
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
    },
    sourcemap: false,
    target: 'modules',
    minify: false,
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
