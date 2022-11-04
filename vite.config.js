import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteCompression from 'vite-plugin-compression';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPrefixer from 'postcss-prefixer';

import { version, author, license } from './package.json';

const banner = `/*!
  * MJSZ VBR Widgets v${version}
  * (c) ${new Date().getFullYear()} ${author.name}
  * Released: ${new Date().toLocaleString('en-GB')}
  * Released under the ${license} License.
  */`;

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
        fileName: (format) => `mjsz-vbr-widget.${format}.js`,
        formats: ['es', 'iife'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          banner: banner,
          globals: {
            vue: 'Vue',
          },
        },
      },
      // terserOptions: {
      //   compress: {
      //     ecma: 2017,
      //   },
      // },
      sourcemap: true,
      target: 'modules',
      minify: true,
    },
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

      viteCompression({
        algorithm: 'gzip',
      }),
      viteCompression({
        algorithm: 'brotliCompress',
      }),
    ],
  };
});
