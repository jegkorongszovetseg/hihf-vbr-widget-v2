import { defineCustomElement } from 'vue';

import Standings from './Standings.ce.vue';
import Schedule from './Schedule.ce.vue';
import FieldPlayersLeader from './FieldPlayersLeader.ce.vue';
import FieldPlayersPenalties from './FieldPlayersPenalties.ce.vue';

const StandingsCE = defineCustomElement(Standings);
const ScheduleCE = defineCustomElement(Schedule);
const FieldPlayersLeaderCE = defineCustomElement(FieldPlayersLeader);
const FieldPlayersPenaltiesCE = defineCustomElement(FieldPlayersPenalties);

export { StandingsCE, ScheduleCE, FieldPlayersLeaderCE, FieldPlayersPenaltiesCE };

export function register() {
  customElements.define('mjsz-vbr-standings', StandingsCE);
  customElements.define('mjsz-vbr-schedule', ScheduleCE);
  customElements.define('mjsz-vbr-players-leader', FieldPlayersLeaderCE);
  customElements.define('mjsz-vbr-players-penalties', FieldPlayersPenaltiesCE);
}

export default register;
