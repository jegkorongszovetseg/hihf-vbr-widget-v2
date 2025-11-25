import MjszVbrElementsCore from '@mjsz-vbr-elements/core';
import MjszVbrElements from '@mjsz-vbr-elements/elements';
import MjszVbrElementsExtended from '@mjsz-vbr-elements/extended';
import MjszVbrElementsGamecenter from '@mjsz-vbr-elements/gamecenter';
import MjszInternal from '@mjsz-vbr-elements/internal';
import MjszVbrElementsLiga from '@mjsz-vbr-elements/liga';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';
import App from './App.vue';
import './style.css';
import 'uno.css';
import '@unocss/reset/tailwind.css';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

const app = createApp(App);

app.use(MjszVbrElementsCore, {
  modules: [MjszVbrElements, MjszVbrElementsExtended, MjszVbrElementsLiga, MjszVbrElementsGamecenter, MjszInternal],
  apiKey: import.meta.env.VITE_VBR_API_KEY,
});

app.use(router);

app.mount('#app');
