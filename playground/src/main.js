import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router/auto';
import { createConfig } from '@mjsz-vbr-elements/core';
import MjszVbrElements from '@mjsz-vbr-elements/elements';
import MjszVbrElementsExtended from '@mjsz-vbr-elements/extended';
import App from './App.vue';
import './style.css';
import 'uno.css';
import '@unocss/reset/tailwind.css';

createConfig({
  modules: [MjszVbrElements, MjszVbrElementsExtended],
  apiKey: import.meta.env.VITE_VBR_API_KEY,
});

const router = createRouter({
  history: createWebHistory(),
});

const app = createApp(App);

app.use(router);

app.mount('#app');
