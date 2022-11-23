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
    entry: path.resolve(__dirname, '../src/@core/index.js'),
    name: 'MjszWidgetCore',
    fileName: (format) => `mjsz-vbr-core.${format}.js`,
    external: [],
    globals: {},
  },
  {
    entry: path.resolve(__dirname, '../src/@widgets/index.js'),
    name: 'MjszWidgetElements',
    fileName: (format) => `mjsz-vbr-elements.${format}.js`,
    external: [
      '@VbrWidget/core',
      '@VbrWidget/components',
      '@VbrWidget/composables',
      '@VbrWidget/utils',
      '@VbrWidget/icons',
    ],
    globals: {
      '@VbrWidget/core': 'MjszWidgetCore',
      '@VbrWidget/components': 'MjszWidgetCore',
      '@VbrWidget/composables': 'MjszWidgetCore',
      '@VbrWidget/utils': 'MjszWidgetCore',
      '@VbrWidget/icons': 'MjszWidgetCore',
    },
  },
  {
    entry: path.resolve(__dirname, '../src/bundle.js'),
    name: 'MjszWidgetBundle',
    fileName: (format) => `mjsz-vbr-bundle.${format}.js`,
    external: [],
    globals: {},
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
