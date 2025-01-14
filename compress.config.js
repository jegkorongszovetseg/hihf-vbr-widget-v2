import { compression } from 'vite-plugin-compression2';

export const compressConfig = [
  compression({
    algorithm: 'gzip',
    include: /iife.js$/,
  }),
  compression({
    algorithm: 'brotliCompress',
    include: /iife.js$/,
  }),
];
