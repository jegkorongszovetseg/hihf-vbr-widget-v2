import { defineCustomElement } from 'vue';

import { Playoffs, Statistics, ScheduleLiga, StandingsLiga, TeamsLiga, TeamLiga } from './components';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);
const StandingsLigaCE = defineCustomElement(StandingsLiga);
const TeamsLigaCE = defineCustomElement(TeamsLiga);
const TeamLigaCE = defineCustomElement(TeamLiga);

export {
  Statistics,
  ScheduleLiga,
  Playoffs,
  StandingsLiga,
  TeamsLiga,
  TeamLiga,
  StatisticsCE,
  ScheduleLigaCE,
  PlayoffsCE,
  StandingsLigaCE,
  TeamsLigaCE,
  TeamLigaCE,
};

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
  customElements.define('mjsz-vbr-standings-liga', StandingsLigaCE);
  customElements.define('mjsz-vbr-teams-liga', TeamsLigaCE);
  customElements.define('mjsz-vbr-team-liga', TeamLigaCE);
}

export default register;
