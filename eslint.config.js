import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  formatters: true,
  rules: {
    'style/semi': ['error', 'always'],
  },
});
