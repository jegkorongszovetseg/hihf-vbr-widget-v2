import { defineCustomElement } from 'vue';
import { Calendar, GamesTimeline, ScheduleCup, IVRIdentifiers, Championship } from './components';

const CalendarCE = defineCustomElement(Calendar);
const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);
const GamesTimelineCE = defineCustomElement(GamesTimeline);

export {
  Calendar,
  Championship,
  ScheduleCup,
  IVRIdentifiers,
  GamesTimeline,
  ChampionshipCE,
  ScheduleCupCE,
  IVRIdentifiersCE,
  CalendarCE,
  GamesTimelineCE,
};

export function register() {
  customElements.define('mjsz-vbr-calendar', CalendarCE);
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
  customElements.define('mjsz-vbr-schedule-cup', ScheduleCupCE);
  customElements.define('mjsz-vbr-ibr-identifiers', IVRIdentifiersCE);
  customElements.define('mjsz-vbr-games-timeline', GamesTimelineCE);
}

export default {
  install: () => register(),
};
