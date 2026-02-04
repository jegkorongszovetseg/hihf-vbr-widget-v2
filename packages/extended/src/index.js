import { defineCustomElement } from 'vue';
import { Calendar, Championship, Countdown, GamesTimeline, GamesTimelineSocket, RecruitmentInfo, ScheduleCup, StandingsSelector } from './components';

const CalendarCE = defineCustomElement(Calendar);
const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);
const GamesTimelineCE = defineCustomElement(GamesTimeline);
const GamesTimelineSocketCE = defineCustomElement(GamesTimelineSocket);
const StandingsSelectorCE = defineCustomElement(StandingsSelector);
const CountdownCE = defineCustomElement(Countdown);
const RecruitmentInfoCE = defineCustomElement(RecruitmentInfo);

export {
  Calendar,
  CalendarCE,
  Championship,
  ChampionshipCE,
  Countdown,
  CountdownCE,
  GamesTimeline,
  GamesTimelineCE,
  RecruitmentInfo,
  RecruitmentInfoCE,
  ScheduleCup,
  ScheduleCupCE,
  StandingsSelector,
  StandingsSelectorCE,
};

export function register() {
  customElements.define('mjsz-vbr-calendar', CalendarCE);
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
  customElements.define('mjsz-vbr-schedule-cup', ScheduleCupCE);
  customElements.define('mjsz-vbr-games-timeline', GamesTimelineCE);
  customElements.define('mjsz-vbr-games-timeline-socket', GamesTimelineSocketCE);
  customElements.define('mjsz-vbr-standings-selector', StandingsSelectorCE);
  customElements.define('mjsz-vbr-countdown', CountdownCE);
  customElements.define('mjsz-vbr-recruitment-info', RecruitmentInfoCE);
}

export default {
  install: () => register(),
};
