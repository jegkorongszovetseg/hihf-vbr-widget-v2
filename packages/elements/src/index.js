import { defineCustomElement } from 'vue';

import {
  Standings,
  Schedule,
  FieldPlayersLeader,
  FieldPlayersPenalties,
  GoaliesLeader,
  TeamAttendance,
  TeamFairplay,
  TeamPenaltyKilling,
  TeamPowerplay,
  TeamScoringEfficiency,
} from './components';

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
