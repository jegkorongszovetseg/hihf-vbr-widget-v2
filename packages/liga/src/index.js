import { defineCustomElement } from 'vue';

import {
  PlayerLiga,
  PlayersLiga,
  Playoffs,
  ScheduleLiga,
  StandingsLiga,
  Statistics,
  TeamLiga,
  TeamsLiga,
  TopListLiga,
} from './components';

const StatisticsCE = defineCustomElement(Statistics);
const ScheduleLigaCE = defineCustomElement(ScheduleLiga);
const PlayoffsCE = defineCustomElement(Playoffs);
const StandingsLigaCE = defineCustomElement(StandingsLiga);
const TeamsLigaCE = defineCustomElement(TeamsLiga);
const TeamLigaCE = defineCustomElement(TeamLiga);
const PlayersLigaCE = defineCustomElement(PlayersLiga);
const PlayerLigaCE = defineCustomElement(PlayerLiga);
const TopListLigaCE = defineCustomElement(TopListLiga);

export {
  PlayerLiga,
  PlayerLigaCE,
  PlayersLiga,
  PlayersLigaCE,
  Playoffs,
  PlayoffsCE,
  ScheduleLiga,
  ScheduleLigaCE,
  StandingsLiga,
  StandingsLigaCE,
  Statistics,
  StatisticsCE,
  TeamLiga,
  TeamLigaCE,
  TeamsLiga,
  TeamsLigaCE,
  TopListLiga,
  TopListLigaCE,
};

export function register() {
  customElements.define('mjsz-vbr-statistics', StatisticsCE);
  customElements.define('mjsz-vbr-schedule-liga', ScheduleLigaCE);
  customElements.define('mjsz-vbr-playoffs', PlayoffsCE);
  customElements.define('mjsz-vbr-standings-liga', StandingsLigaCE);
  customElements.define('mjsz-vbr-teams-liga', TeamsLigaCE);
  customElements.define('mjsz-vbr-players-liga', PlayersLigaCE);
  customElements.define('mjsz-vbr-player-liga', PlayerLigaCE);
  customElements.define('mjsz-vbr-team-liga', TeamLigaCE);
  customElements.define('mjsz-vbr-top-list-liga', TopListLigaCE);
}

export default {
  install: () => register(),
};
