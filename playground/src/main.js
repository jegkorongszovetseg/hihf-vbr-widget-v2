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
  apiKey: 'dd8adf5fdb738b3741fa579b5ede5ce69b681f62',
});

const router = createRouter({
  history: createWebHistory(),
});

const app = createApp(App);

app.use(router);

app.mount('#app');
