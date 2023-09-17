import viteCompression from 'vite-plugin-compression';

export const compressConfig = [
  viteCompression({
    algorithm: 'gzip',
    filter: (file) => file.includes('iife'),
  }),
  viteCompression({
    algorithm: 'brotliCompress',
    filter: (file) => file.includes('iife'),
  }),
];

export const BUILD_FORMATS = new Map().set('iife', 'global').set('es', 'esm');
