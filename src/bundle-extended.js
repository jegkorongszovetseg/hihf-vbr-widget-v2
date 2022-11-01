import { defineCustomElement } from 'vue';
import Statistics from './components/widgets/extended/Statistics.ce.vue';

// export const setup = ({ apiKey }) => {
//   window.__MJSZ_VBR_WIDGET__ = { apiKey };
//   register();
// };

const StatisticsCE = defineCustomElement(Statistics);

export { StatisticsCE };

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
}
