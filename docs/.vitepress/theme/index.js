import DefaultTheme from 'vitepress/theme';
import { setup } from '../../../dist/bundle';

export default {
  ...DefaultTheme,
  enhanceApp() {
    setup({
      apiKey: import.meta.env.VITE_VBR_API_KEY,
    });
  },
};
