import { defineCustomElement } from 'vue';

import Standings from './Standings.ce.vue';
import Schedule from './Schedule.ce.vue';
import FieldPlayersLeader from './FieldPlayersLeader.ce.vue';
import FieldPlayersPenalties from './FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './GoaliesLeader.ce.vue';
import TeamAttendance from './TeamAttendance.ce.vue';
import TeamFairplay from './TeamFairplay.ce.vue';
import TeamPenaltyKilling from './TeamPenaltyKilling.ce.vue';
import TeamPowerplay from './TeamPowerplay.ce.vue';
import TeamScoringEfficiency from './TeamScoringEfficiency.ce.vue';

const StandingsCE = defineCustomElement(Standings);
const ScheduleCE = defineCustomElement(Schedule);
const FieldPlayersLeaderCE = defineCustomElement(FieldPlayersLeader);
const FieldPlayersPenaltiesCE = defineCustomElement(FieldPlayersPenalties);
const GoaliesLeaderCE = defineCustomElement(GoaliesLeader);
const TeamAttendanceCE = defineCustomElement(TeamAttendance);
const TeamFairplayCE = defineCustomElement(TeamFairplay);
const TeamPenaltyKillingCE = defineCustomElement(TeamPenaltyKilling);
const TeamPowerplayCE = defineCustomElement(TeamPowerplay);
const TeamScoringEfficiencyCE = defineCustomElement(TeamScoringEfficiency);

export {
  StandingsCE,
  ScheduleCE,
  FieldPlayersLeaderCE,
  FieldPlayersPenaltiesCE,
  GoaliesLeaderCE,
  TeamAttendanceCE,
  TeamFairplayCE,
  TeamPenaltyKillingCE,
  TeamPowerplayCE,
  TeamScoringEfficiencyCE,
};

export function register() {
  customElements.define('mjsz-vbr-standings', StandingsCE);
  customElements.define('mjsz-vbr-schedule', ScheduleCE);
  customElements.define('mjsz-vbr-players-leader', FieldPlayersLeaderCE);
  customElements.define('mjsz-vbr-players-penalties', FieldPlayersPenaltiesCE);
  customElements.define('mjsz-vbr-goalies', GoaliesLeaderCE);
  customElements.define('mjsz-vbr-team-attendance', TeamAttendanceCE);
  customElements.define('mjsz-vbr-team-fairplay', TeamFairplayCE);
  customElements.define('mjsz-vbr-team-penalty-killing', TeamPenaltyKillingCE);
  customElements.define('mjsz-vbr-team-powerplay', TeamPowerplayCE);
  customElements.define('mjsz-vbr-team-scoring', TeamScoringEfficiencyCE);
}

export default register;