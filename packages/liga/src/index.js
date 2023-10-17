import { defineCustomElement } from 'vue';

import { Playoffs, Statistics, ScheduleLiga, StandingsLiga } from './components';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);
const StandingsLigaCE = defineCustomElement(StandingsLiga);

export { Statistics, ScheduleLiga, Playoffs, StandingsLiga, StatisticsCE, ScheduleLigaCE, PlayoffsCE, StandingsLigaCE };

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
  customElements.define('mjsz-vbr-standings-liga', StandingsLigaCE);
}

export default register;
