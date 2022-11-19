import { defineCustomElement } from 'vue';

// import Schedule from '../../../src/components/widgets/Schedule.ce.vue';
import Standings from '../../src/components/widgets/Standings.ce.vue';

export const setup = ({ apiKey }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };
  register();
};

// const ScheduleCE = defineCustomElement(Schedule);
const StandingsCE = defineCustomElement(Standings);

export { StandingsCE };

export function register() {
  // customElements.define('mjsz-vbr-schedule', ScheduleCE);
  customElements.define('mjsz-vbr-standings', StandingsCE);
}
