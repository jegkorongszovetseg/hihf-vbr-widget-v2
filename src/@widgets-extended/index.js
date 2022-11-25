import { defineCustomElement } from 'vue';

import Statistics from './statistics/Statistics.ce.vue';
import ScheduleLiga from './schedule/ScheduleLiga.ce.vue';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);

export { StatisticsCE, ScheduleLigaCE };

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
}

export default register;
