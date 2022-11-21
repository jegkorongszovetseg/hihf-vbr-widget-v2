import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import packageJson from '../package.json' assert { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const banner = `/*!
  * MJSZ VBR Widgets v${packageJson.version}
  * (c) ${new Date().getFullYear()} ${packageJson.author.name}
  * Released: ${new Date().toLocaleString('en-GB')}
  * Released under the ${packageJson.license} License.
  */`;

const builds = [
  {
    entry: path.resolve(__dirname, '../src/@shared/index.js'),
    name: 'Shared',
    fileName: (format) => `mjsz-vbr-shared.${format}.js`,
    external: [],
    globals: {},
  },
  {
    entry: path.resolve(__dirname, '../src/@widgets/bundle.js'),
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
          banner: banner,
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
