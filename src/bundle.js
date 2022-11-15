import { defineCustomElement } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';
import Standings from './components/widgets/Standings.ce.vue';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader.ce.vue';
import FieldPlayersPenalties from './components/widgets/FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './components/widgets/GoaliesLeader.ce.vue';
import TeamAttendance from './components/widgets/TeamAttendance.ce.vue';
import TeamFairplay from './components/widgets/TeamFairplay.ce.vue';
import TeamPenaltyKilling from './components/widgets/TeamPenaltyKilling.ce.vue';
import TeamPowerplay from './components/widgets/TeamPowerplay.ce.vue';
import TeamScoringEfficiency from './components/widgets/TeamScoringEfficiency.ce.vue';
// import Statistics from './components/widgets/extended/statistics/Statistics.ce.vue';

export const setup = ({ apiKey }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };
  register();
};

const FieldPlayersLeaderCE = defineCustomElement(FieldPlayersLeader);
const ScheduleCE = defineCustomElement(Schedule);
const StandingsCE = defineCustomElement(Standings);
const FieldPlayersPenaltiesCE = defineCustomElement(FieldPlayersPenalties);
const GoaliesLeaderCE = defineCustomElement(GoaliesLeader);
const TeamAttendanceCE = defineCustomElement(TeamAttendance);
const TeamFairplayCE = defineCustomElement(TeamFairplay);
const TeamPenaltyKillingCE = defineCustomElement(TeamPenaltyKilling);
const TeamPowerplayCE = defineCustomElement(TeamPowerplay);
const TeamScoringEfficiencyCE = defineCustomElement(TeamScoringEfficiency);
// const StatisticsCE = defineCustomElement(Statistics);

export {
  FieldPlayersLeaderCE,
  ScheduleCE,
  StandingsCE,
  FieldPlayersPenaltiesCE,
  GoaliesLeaderCE,
  TeamAttendanceCE,
  TeamFairplayCE,
  TeamPenaltyKillingCE,
  TeamPowerplayCE,
  TeamScoringEfficiencyCE,
  // StatisticsCE,
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
  // customElements.define('mjsz-vbr-statistics', StatisticsCE);
}
