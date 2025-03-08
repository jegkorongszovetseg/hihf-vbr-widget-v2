import { defineCustomElement } from 'vue';
import { Calendar, Championship, ClubInfo, Countdown, GamesTimeline, IVRIdentifiers, ScheduleCup, StandingsSelector } from './components';

const CalendarCE = defineCustomElement(Calendar);
const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);
const GamesTimelineCE = defineCustomElement(GamesTimeline);
const StandingsSelectorCE = defineCustomElement(StandingsSelector);
const CountdownCE = defineCustomElement(Countdown);
const ClubInfoCE = defineCustomElement(ClubInfo);

export {
  Calendar,
  CalendarCE,
  Championship,
  ChampionshipCE,
  ClubInfo,
  ClubInfoCE,
  Countdown,
  CountdownCE,
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
  customElements.define('mjsz-vbr-countdown', CountdownCE);
  customElements.define('mjsz-vbr-club-info', ClubInfoCE);
}

export default {
  install: () => register(),
};
