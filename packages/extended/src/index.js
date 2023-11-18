import { defineCustomElement } from 'vue';

import { Championship, ScheduleCup, IVRIdentifiers } from './components';

const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);

export { Championship, ScheduleCup, IVRIdentifiers, ChampionshipCE, ScheduleCupCE, IVRIdentifiersCE };

export function register() {
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
  customElements.define('mjsz-vbr-schedule-cup', ScheduleCupCE);
  customElements.define('mjsz-vbr-ibr-identifiers', IVRIdentifiersCE);
}

export default register;
