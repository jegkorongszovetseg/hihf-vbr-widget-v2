import { defineCustomElement } from 'vue';

import Statistics from './statistics/Statistics.ce.vue';

const StatisticsCE = defineCustomElement(Statistics);

export { StatisticsCE };

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
}

export default register;
