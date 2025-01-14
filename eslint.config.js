import antfu from '@antfu/eslint-config';

export default antfu({
  vue: false,
  formatters: true,
  rules: {
    'style/semi': ['error', 'always'],
  },
});
