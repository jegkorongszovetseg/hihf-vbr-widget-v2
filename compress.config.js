import { compression } from 'vite-plugin-compression2';

export const compressConfig = [
  compression({
    algorithms: [
      'gzip',
      'brotliCompress',
    ],
    include: /iife.js$/,
  }),
  // compression({
  //   algorithm: 'brotliCompress',
  //   include: /iife.js$/,
  // }),
];
