import { defineCustomElement } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';
import './init.js';

customElements.define('vbr-schedule', defineCustomElement(Schedule));
