import { defineCustomElement } from 'vue';

import { Championship } from './components';

const ChampionshipCE = defineCustomElement(Championship);

export { Championship, ChampionshipCE };

export function register() {
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
}

export default register;
