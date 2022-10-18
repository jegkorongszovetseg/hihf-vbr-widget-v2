import { defineCustomElement } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';
import Standings from './components/widgets/Standings.ce.vue';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader.ce.vue';

export const setup = ({ apiKey }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };
  register();
};

const FieldPlayersLeaderCE = defineCustomElement(FieldPlayersLeader);
const ScheduleCE = defineCustomElement(Schedule);
const StandingsCE = defineCustomElement(Standings);

export { FieldPlayersLeaderCE, ScheduleCE, StandingsCE };

export function register() {
  customElements.define('mjsz-vbr-fielad-players-leader', FieldPlayersLeaderCE);
  customElements.define('mjsz-vbr-schedule', ScheduleCE);
  customElements.define('mjsz-vbr-standings', StandingsCE);
}
