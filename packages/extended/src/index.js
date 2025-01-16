import { defineCustomElement } from 'vue';
import { Calendar, Championship, GamesTimeline, IVRIdentifiers, ScheduleCup, StandingsSelector } from './components';

const CalendarCE = defineCustomElement(Calendar);
const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);
const GamesTimelineCE = defineCustomElement(GamesTimeline);
const StandingsSelectorCE = defineCustomElement(StandingsSelector);

export {
  Calendar,
  CalendarCE,
  Championship,
  ChampionshipCE,
  GamesTimeline,
  GamesTimelineCE,
  IVRIdentifiers,
  IVRIdentifiersCE,
  ScheduleCup,
  ScheduleCupCE,
  StandingsSelector,
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
