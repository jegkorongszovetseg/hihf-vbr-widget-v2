import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: ['stories/**/*.story.vue'],
  setupFile: '/histoire.setup.js',
});
