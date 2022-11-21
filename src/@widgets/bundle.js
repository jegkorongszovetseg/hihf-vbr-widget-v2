import { defineCustomElement } from 'vue';

import Standings from './Standings.ce.vue';
import Schedule from './Schedule.ce.vue';

export const setup = ({ apiKey }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };
  register();
};

const StandingsCE = defineCustomElement(Standings);
const ScheduleCE = defineCustomElement(Schedule);

export { StandingsCE, ScheduleCE };

export function register() {
  customElements.define('mjsz-vbr-standings', StandingsCE);
  customElements.define('mjsz-vbr-schedule', ScheduleCE);
}
