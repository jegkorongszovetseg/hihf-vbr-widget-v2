import { defineCustomElement } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';
export { setup } from './init.js';

customElements.define('vbr-schedule', defineCustomElement(Schedule));
