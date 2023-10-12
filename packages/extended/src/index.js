import { defineCustomElement } from 'vue';

import { Championship, ScheduleCup } from './components';

const ChampionshipCE = defineCustomElement(Championship);
const ScheduleCupCE = defineCustomElement(ScheduleCup);

export { Championship, ScheduleCup, ChampionshipCE, ScheduleCupCE };

export function register() {
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
  customElements.define('mjsz-vbr-schedule-cup', ScheduleCupCE);
}

export default register;
