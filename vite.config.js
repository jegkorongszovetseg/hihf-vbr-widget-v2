import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPrefixer from 'postcss-prefixer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': process.env,
    },
    resolve: {
      alias: {
        '@vbr-widget/core': path.resolve(__dirname, './src/@core/'),
        '@vbr-widget/components': path.resolve(__dirname, './src/@core/components/index.js'),
        '@vbr-widget/composables': path.resolve(__dirname, './src/@core/composables/index.js'),
        '@vbr-widget/utils': path.resolve(__dirname, './src/@core/utils/index.js'),
        '@vbr-widget/icons': path.resolve(__dirname, './src/@core/icons/index.js'),
      },
    },
    css: {
      postcss: {
        plugins: [
          postcssMixins,
          postcssNested,
          postcssPrefixer({
            prefix: env.VITE_CSS_CLASS_PREFIX,
            ignore: [/icon/, /is-[a-zA-Z]*/, /transition-[a-zA-Z]*/, /g-[a-zA-Z]*/, 'label'],
          }),
        ],
      },
    },

    // build: {
    //   // lib: {
    //   //   entry: 'src/bundle.js',
    //   //   name: 'MjszVbrWidget',
    //   //   // fileName: (format) => `mjsz-vbr-widget.${format}.js`,
    //   //   formats: ['es', 'iife'],
    //   // },
    //   // rollupOptions: {
    //   //   external: ['vue'],
    //   //   output: {
    //   //     banner: banner,
    //   //     globals: {
    //   //       vue: 'Vue',
    //   //     },
    //   //   },
    //   // },
    //   // terserOptions: {
    //   //   compress: {
    //   //     ecma: 2017,
    //   //   },
    //   // },
    //   // sourcemap: false,
    //   // target: 'modules',
    //   // minify: true,
    // },
    plugins: [
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

      // viteCompression({
      //   algorithm: 'gzip',
      // }),
      // viteCompression({
      //   algorithm: 'brotliCompress',
      // }),
    ],
  };
});
