import { HstVue } from '@histoire/plugin-vue';
import { defineConfig } from 'histoire';

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['stories/**/*.story.vue'],
  setupFile: '/histoire.setup.js',
  theme: {
    title: 'MJSZ VBR Elements',
    logoHref: 'https://api.icehockey.hu/widgets/docs/v2/',
    defaultColorScheme: 'light',
  },
});
