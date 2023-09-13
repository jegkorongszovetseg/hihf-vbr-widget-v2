import { defineCustomElement } from 'vue';

import { Playoffs, Statistics, ScheduleLiga, Game } from './components';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);
const GameCE = defineCustomElement(Game);

export { Game, StatisticsCE, ScheduleLigaCE, PlayoffsCE, GameCE };

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
  customElements.define('mjsz-vbr-game', GameCE);
}

export default register;
