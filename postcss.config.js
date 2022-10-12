import { loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = loadEnv(mode, process.cwd());
  return {
    plugins: {
      'postcss-mixins': {},
      'postcss-nested': {},
      'postcss-prefixer': {
        prefix: process.env.VITE_CSS_CLASS_PREFIX,
        ignore: [/icon/, /is-[a-zA-Z]*/, /transition-[a-zA-Z]*/, 'label'],
      },
    },
  };
};
