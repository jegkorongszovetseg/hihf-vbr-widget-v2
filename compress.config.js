import { compression } from 'vite-plugin-compression2';

export const compressConfig = [
  compression({
    algorithms: [
      'gzip',
      'brotliCompress',
    ],
    include: /iife.js$/,
  }),
];
