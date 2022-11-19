import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const builds = [
  {
    entry: path.resolve(__dirname, '../../src/components/shared/index.js'),
    name: 'Shared',
    fileName: (format) => `mjsz-vbr-shared.${format}.js`,
    external: [],
    globals: {},
  },
  {
    entry: path.resolve(__dirname, './base.js'),
    name: 'Widgets',
    fileName: (format) => `mjsz-vbr-widgets.${format}.js`,
    external: ['@shared'],
    globals: { ['@shared']: 'Shared' },
  },
];

builds.forEach(async (settings) => {
  const { entry, name, fileName, external, globals } = settings;
  await build({
    build: {
      lib: {
        entry,
        name,
        fileName,
        formats: ['es', 'iife'],
      },
      rollupOptions: {
        external: ['vue', ...external],
        output: {
          dir: 'build',
          globals: {
            vue: 'Vue',
            ...globals,
          },
        },
      },
      emptyOutDir: false,
      sourcemap: false,
      target: 'modules',
      minify: false,
    },
  });
});

// await build({
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, '../../src/components/shared/index.js'),
//       name: 'Shared',
//       fileName: (format) => `mjsz-vbr-shared.${format}.js`,
//       formats: ['iife'],
//     },
//     rollupOptions: {
//       external: ['vue'],
//       output: {
//         dir: 'build',
//         globals: {
//           vue: 'Vue',
//         },
//       },
//     },
//     sourcemap: false,
//     target: 'modules',
//     minify: false,
//   },
// });

// await build({
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, './base.js'),
//       name: 'Widgets',
//       fileName: (format) => `mjsz-vbr-widgets.${format}.js`,
//       formats: ['iife'],
//     },
//     rollupOptions: {
//       external: ['vue', '@shared'],
//       output: {
//         dir: 'build',
//         globals: {
//           vue: 'Vue',
//           ['@shared']: 'Shared',
//         },
//       },
//     },
//     emptyOutDir: false,
//     sourcemap: false,
//     target: 'modules',
//     minify: false,
//   },
// });
