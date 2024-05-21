import { defineCustomElement } from 'vue';
import { Calendar, ScheduleCup, IVRIdentifiers, Championship } from './components';

const CalendarCE = defineCustomElement(Calendar);
const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);

export {
  Calendar,
  Championship,
  ScheduleCup,
  IVRIdentifiers,
  ChampionshipCE,
  ScheduleCupCE,
  IVRIdentifiersCE,
  CalendarCE,
};

export function register() {
  customElements.define('mjsz-vbr-calendar', CalendarCE);
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
  customElements.define('mjsz-vbr-schedule-cup', ScheduleCupCE);
  customElements.define('mjsz-vbr-ibr-identifiers', IVRIdentifiersCE);
}

export default {
  install: () => register(),
};
