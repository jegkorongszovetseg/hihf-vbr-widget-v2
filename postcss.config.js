import { loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = loadEnv(mode, process.cwd());
  return {
    plugins: {
      'postcss-nesting': {},
      'postcss-prefixer': { prefix: process.env.VITE_CSS_CLASS_PREFIX, ignore: [/icon/, '.is-active', '.is-disabled'] },
    },
  };
};
