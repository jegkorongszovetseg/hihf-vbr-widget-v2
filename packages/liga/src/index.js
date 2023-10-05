import { defineCustomElement } from 'vue';

import { Playoffs, Statistics, ScheduleLiga } from './components';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);

export { Statistics, ScheduleLiga, Playoffs, StatisticsCE, ScheduleLigaCE, PlayoffsCE };

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
}

export default register;
