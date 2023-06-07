import { defineCustomElement } from 'vue';
import Schedule from './@widgets/Schedule.ce.vue';
import Standings from './@widgets/Standings.ce.vue';
import FieldPlayersLeader from './@widgets/FieldPlayersLeader.ce.vue';
import FieldPlayersPenalties from './@widgets/FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './@widgets/GoaliesLeader.ce.vue';
import TeamAttendance from './@widgets/TeamAttendance.ce.vue';
import TeamFairplay from './@widgets/TeamFairplay.ce.vue';
import TeamPenaltyKilling from './@widgets/TeamPenaltyKilling.ce.vue';
import TeamPowerplay from './@widgets/TeamPowerplay.ce.vue';
import TeamScoringEfficiency from './@widgets/TeamScoringEfficiency.ce.vue';
import Statistics from './@widgets-extended/statistics/Statistics.ce.vue';
import ScheduleLiga from './@widgets-extended/schedule/ScheduleLiga.ce.vue';
import Playoffs from './@widgets-extended/playoffs/Playoffs.ce.vue';

const ScheduleCE = defineCustomElement(Schedule);
const StandingsCE = defineCustomElement(Standings);
const FieldPlayersLeaderCE = defineCustomElement(FieldPlayersLeader);
const FieldPlayersPenaltiesCE = defineCustomElement(FieldPlayersPenalties);
const GoaliesLeaderCE = defineCustomElement(GoaliesLeader);
const TeamAttendanceCE = defineCustomElement(TeamAttendance);
const TeamFairplayCE = defineCustomElement(TeamFairplay);
const TeamPenaltyKillingCE = defineCustomElement(TeamPenaltyKilling);
const TeamPowerplayCE = defineCustomElement(TeamPowerplay);
const TeamScoringEfficiencyCE = defineCustomElement(TeamScoringEfficiency);
const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);

export {
  ScheduleCE,
  StandingsCE,
  FieldPlayersLeaderCE,
  FieldPlayersPenaltiesCE,
  GoaliesLeaderCE,
  TeamAttendanceCE,
  TeamFairplayCE,
  TeamPenaltyKillingCE,
  TeamPowerplayCE,
  TeamScoringEfficiencyCE,
  StatisticsCE,
  ScheduleLigaCE,
  PlayoffsCE,
};

export function register() {
  customElements.define('mjsz-vbr-schedule', ScheduleCE);
  customElements.define('mjsz-vbr-standings', StandingsCE);
  customElements.define('mjsz-vbr-players-leader', FieldPlayersLeaderCE);
  customElements.define('mjsz-vbr-players-penalties', FieldPlayersPenaltiesCE);
  customElements.define('mjsz-vbr-goalies', GoaliesLeaderCE);
  customElements.define('mjsz-vbr-team-attendance', TeamAttendanceCE);
  customElements.define('mjsz-vbr-team-fairplay', TeamFairplayCE);
  customElements.define('mjsz-vbr-team-penalty-killing', TeamPenaltyKillingCE);
  customElements.define('mjsz-vbr-team-powerplay', TeamPowerplayCE);
  customElements.define('mjsz-vbr-team-scoring', TeamScoringEfficiencyCE);
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
}

export const createConfig = ({ apiKey, gameResolver, teamResolver, playerResolver }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey, gameResolver, teamResolver, playerResolver };
  register();
};
