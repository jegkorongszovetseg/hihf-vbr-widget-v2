import DefaultTheme from 'vitepress/theme';
import { setup } from '../../../dist/mjsz-vbr-widget.es';

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      setup({
        apiKey: import.meta.env.VITE_VBR_API_KEY,
      });
    }
  },
};