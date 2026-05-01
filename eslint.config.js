import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  typescript: true,
  formatters: true,
  ignores: ['.copilot/**'],
  rules: {
    'style/semi': ['error', 'always'],
  },
});
