import { defineCustomElement } from 'vue';

import Statistics from './statistics/Statistics.ce.vue';
import ScheduleLiga from './schedule/ScheduleLiga.ce.vue';
import Playoffs from './playoffs/Playoffs.ce.vue';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);

export { StatisticsCE, ScheduleLigaCE, PlayoffsCE };

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
}

export default register;
