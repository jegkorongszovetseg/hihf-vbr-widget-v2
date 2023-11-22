import { defineCustomElement } from 'vue';

import { ScheduleCup, IVRIdentifiers, Championship } from './components';
// export { default as Championship } from './components/championship/Championship.ce.vue';

// const Championship = await import('./components/championship/Championship.ce.vue');

const ChampionshipCE = defineCustomElement(Championship);
// const ScheduleCupCE = defineCustomElement(ScheduleCup);
// const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);

// export { IVRIdentifiers };
// export { ScheduleCup };
export { ChampionshipCE };

export function register() {
  customElements.define('mjsz-vbr-championship', ChampionshipCE);
  // customElements.define('mjsz-vbr-schedule-cup', ScheduleCupCE);
  // customElements.define('mjsz-vbr-ibr-identifiers', IVRIdentifiersCE);
}

export default register;
