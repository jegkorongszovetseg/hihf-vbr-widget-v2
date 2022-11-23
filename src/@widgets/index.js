import { defineCustomElement } from 'vue';

import Standings from './Standings.ce.vue';
import Schedule from './Schedule.ce.vue';
import FieldPlayersLeader from './FieldPlayersLeader.ce.vue';
import FieldPlayersPenalties from './FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './GoaliesLeader.ce.vue';
import TeamAttendance from './TeamAttendance.ce.vue';

const StandingsCE = defineCustomElement(Standings);
const ScheduleCE = defineCustomElement(Schedule);
const FieldPlayersLeaderCE = defineCustomElement(FieldPlayersLeader);
const FieldPlayersPenaltiesCE = defineCustomElement(FieldPlayersPenalties);
const GoaliesLeaderCE = defineCustomElement(GoaliesLeader);
const TeamAttendanceCE = defineCustomElement(TeamAttendance);

export { StandingsCE, ScheduleCE, FieldPlayersLeaderCE, FieldPlayersPenaltiesCE, GoaliesLeaderCE, TeamAttendanceCE };

export function register() {
  customElements.define('mjsz-vbr-standings', StandingsCE);
  customElements.define('mjsz-vbr-schedule', ScheduleCE);
  customElements.define('mjsz-vbr-players-leader', FieldPlayersLeaderCE);
  customElements.define('mjsz-vbr-players-penalties', FieldPlayersPenaltiesCE);
  customElements.define('mjsz-vbr-goalies', GoaliesLeaderCE);
  customElements.define('mjsz-vbr-team-attendance', TeamAttendanceCE);
}

export default register;
