import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import versionInjector from 'rollup-plugin-version-injector';
import viteCompression from 'vite-plugin-compression';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPrefixer from 'postcss-prefixer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': process.env,
    },
    css: {
      postcss: {
        plugins: [
          postcssMixins,
          postcssNested,
          postcssPrefixer({
            prefix: env.VITE_CSS_CLASS_PREFIX,
            ignore: [/icon/, /is-[a-zA-Z]*/, /transition-[a-zA-Z]*/, 'label'],
          }),
        ],
      },
    },
    build: {
      lib: {
        entry: 'src/bundle.js',
        name: 'MjszVbrWidget',
        fileName: (format) => `bundle.${format}.js`,
        formats: ['es', 'umd', 'iife'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
          // plugins: [versionInjector()],
        },
      },
      sourcemap: false,
      target: 'modules',
      minify: true,
    },
    plugins: [
      versionInjector(),
      vue({
        reactivityTransform: true,
        template: {
          compilerOptions: {
            isCustomElement: (tag) => {
              return tag.includes('mjsz-vbr-');
            },
          },
        },
      }),

      viteCompression({
        algorithm: 'brotliCompress',
      }),
    ],
  };
});
