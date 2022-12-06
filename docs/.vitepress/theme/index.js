import DefaultTheme from 'vitepress/theme';
import { createConfig } from '../../../dist/mjsz-vbr-bundle.esm-browser.js';

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      createConfig({
        apiKey: 'dd8adf5fdb738b3741fa579b5ede5ce69b681f62',
      });
    }
  },
};
