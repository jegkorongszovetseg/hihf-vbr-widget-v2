import { defineCustomElement } from 'vue';

import { Playoffs, Statistics, ScheduleLiga, Game, Championship } from './components';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);
const GameCE = defineCustomElement(Game);
const ChampionshipCE = defineCustomElement(Championship);

export {
  Game,
  Statistics,
  ScheduleLiga,
  Playoffs,
  Championship,
  StatisticsCE,
  ScheduleLigaCE,
  PlayoffsCE,
  GameCE,
  ChampionshipCE,
};

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
  customElements.define('mjsz-vbr-game', GameCE);
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
}

export default register;
