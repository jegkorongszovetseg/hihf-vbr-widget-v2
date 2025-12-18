import { defineCustomElement } from 'vue';

import AdPlacement from './components/ad-placement-tool/AdPlacement.ce.vue';
import IVRIdentifiers from './components/ivr-identifiers/IvrIdentifiers.ce.vue';

const AdPlacementCE = defineCustomElement(AdPlacement);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);

export { AdPlacement, AdPlacementCE, IVRIdentifiers, IVRIdentifiersCE };

export function register() {
  customElements.define('mjsz-ad-placement', AdPlacementCE);
  customElements.define('mjsz-ivr-identifiers', IVRIdentifiersCE);
}

export default {
  install: () => register(),
};
