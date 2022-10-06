import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/bundle.js',
      name: 'bundle',
      fileName: 'bundle',
      formats: ['es', 'umd', 'iife'],
    },
    rollupOptions: {
      // input: "src/bundle.js",
      // Externalize deps that shouldn't be bundled into the library.
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: false,
    // Reduce bloat from legacy polyfills.
    target: 'modules',
    // Leave minification up to applications.
    minify: false,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => {
            // console.log("tag:", tag);
            return tag.includes('vbr-');
          },
        },
      },
      // customElement: true,
    }),
  ],
});
