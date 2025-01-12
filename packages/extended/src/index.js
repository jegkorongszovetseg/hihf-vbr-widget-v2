import { defineCustomElement } from 'vue';
import { Calendar, GamesTimeline, ScheduleCup, IVRIdentifiers, Championship, StandingsSelector } from './components';

const CalendarCE = defineCustomElement(Calendar);
const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);
const GamesTimelineCE = defineCustomElement(GamesTimeline);
const StandingsSelectorCE = defineCustomElement(StandingsSelector);

export {
  Calendar,
  Championship,
  ScheduleCup,
  IVRIdentifiers,
  GamesTimeline,
  StandingsSelector,
  ChampionshipCE,
  ScheduleCupCE,
  IVRIdentifiersCE,
  CalendarCE,
  GamesTimelineCE,
  StandingsSelectorCE,
};

export function register() {
  customElements.define('mjsz-vbr-calendar', CalendarCE);
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
  customElements.define('mjsz-vbr-schedule-cup', ScheduleCupCE);
  customElements.define('mjsz-vbr-ibr-identifiers', IVRIdentifiersCE);
  customElements.define('mjsz-vbr-games-timeline', GamesTimelineCE);
  customElements.define('mjsz-vbr-standings-selector', StandingsSelectorCE);
}

export default {
  install: () => register(),
};
