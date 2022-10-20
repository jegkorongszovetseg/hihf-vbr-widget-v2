import { defineCustomElement } from 'vue';
import Schedule from './components/widgets/Schedule.ce.vue';
import Standings from './components/widgets/Standings.ce.vue';
import FieldPlayersLeader from './components/widgets/FieldPlayersLeader.ce.vue';
import FieldPlayersPenalties from './components/widgets/FieldPlayersPenalties.ce.vue';
import GoaliesLeader from './components/widgets/GoaliesLeader.ce.vue';
import TeamFairplay from './components/widgets/TeamFairplay.ce.vue';
import Statistics from './components/widgets/extended/Statistics.ce.vue';

export const setup = ({ apiKey }) => {
  window.__MJSZ_VBR_WIDGET__ = { apiKey };
  register();
};

const FieldPlayersLeaderCE = defineCustomElement(FieldPlayersLeader);
const ScheduleCE = defineCustomElement(Schedule);
const StandingsCE = defineCustomElement(Standings);
const FieldPlayersPenaltiesCE = defineCustomElement(FieldPlayersPenalties);
const GoaliesLeaderCE = defineCustomElement(GoaliesLeader);
const TeamFairplayCE = defineCustomElement(TeamFairplay);
const StatisticsCE = defineCustomElement(Statistics);

export {
  FieldPlayersLeaderCE,
  ScheduleCE,
  StandingsCE,
  FieldPlayersPenaltiesCE,
  GoaliesLeaderCE,
  TeamFairplayCE,
  StatisticsCE,
};

export function register() {
  customElements.define('mjsz-vbr-fielad-players-leader', FieldPlayersLeaderCE);
  customElements.define('mjsz-vbr-schedule', ScheduleCE);
  customElements.define('mjsz-vbr-standings', StandingsCE);
  customElements.define('mjsz-vbr-players-penalties', FieldPlayersPenaltiesCE);
  customElements.define('mjsz-vbr-goalies', GoaliesLeaderCE);
  customElements.define('mjsz-vbr-team-fairplay', TeamFairplayCE);
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
}
