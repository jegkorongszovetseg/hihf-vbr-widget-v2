import { defineCustomElement } from 'vue';

import { Playoffs, Statistics, ScheduleLiga, StandingsLiga, TeamsLiga, PlayersLiga } from './components';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);
const StandingsLigaCE = defineCustomElement(StandingsLiga);
const TeamsLigaCE = defineCustomElement(TeamsLiga);
const PlayersLigaCE = defineCustomElement(PlayersLiga);

export {
  Statistics,
  ScheduleLiga,
  Playoffs,
  StandingsLiga,
  TeamsLiga,
  PlayersLiga,
  StatisticsCE,
  ScheduleLigaCE,
  PlayoffsCE,
  StandingsLigaCE,
  TeamsLigaCE,
  PlayersLigaCE,
};

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
  customElements.define('mjsz-vbr-standings-liga', StandingsLigaCE);
  customElements.define('mjsz-vbr-teams-liga', TeamsLigaCE);
  customElements.define('mjsz-vbr-players-liga', PlayersLigaCE);
}

export default register;
