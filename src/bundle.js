import { defineCustomElement } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';

export const setup = ({ apiKey }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };
  init();
};

export const init = () => {
  customElements.define('vbr-schedule', defineCustomElement(Schedule));
};
