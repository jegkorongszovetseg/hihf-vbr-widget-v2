import DefaultTheme from 'vitepress/theme';
import { createConfig } from '../../../dist/mjsz-vbr-bundle.esm-browser.js';

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      createConfig({
        apiKey: import.meta.env.VITE_VBR_API_KEY,
      });
    }
  },
};
