import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router/auto';
import MjszVbrElementsCore from '@mjsz-vbr-elements/core';
import MjszVbrElements from '@mjsz-vbr-elements/elements';
import MjszVbrElementsExtended from '@mjsz-vbr-elements/extended';
import MjszVbrElementsLiga from '@mjsz-vbr-elements/liga';
import MjszVbrElementsGamecenter from '@mjsz-vbr-elements/gamecenter';
import App from './App.vue';
import './style.css';
import 'uno.css';
import '@unocss/reset/tailwind.css';

const router = createRouter({
  history: createWebHistory(),
});

const app = createApp(App);

app.use(MjszVbrElementsCore, {
  modules: [MjszVbrElements, MjszVbrElementsExtended, MjszVbrElementsLiga, MjszVbrElementsGamecenter],
  apiKey: import.meta.env.VITE_VBR_API_KEY,
});

app.use(router);

app.mount('#app');
