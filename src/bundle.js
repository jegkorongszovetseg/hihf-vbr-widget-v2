import { defineCustomElement } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';

customElements.define('vbr-schedule', defineCustomElement(Schedule));
