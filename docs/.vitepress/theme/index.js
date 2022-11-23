import DefaultTheme from 'vitepress/theme';
import { createConfig } from '../../../dist/mjsz-vbr-core.es.js';
import Elements from '../../../dist/mjsz-vbr-elements.es.js';

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      createConfig({
        modules: [Elements],
        apiKey: import.meta.env.VITE_VBR_API_KEY,
      });
    }
  },
};
