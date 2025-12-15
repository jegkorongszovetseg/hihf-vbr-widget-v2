import { defineCustomElement } from 'vue';

import AdPlacement from './components/ad-placement-tool/AdPlacement.ce.vue';

const AdPlacementCE = defineCustomElement(AdPlacement);

export { AdPlacement, AdPlacementCE };

export function register() {
  customElements.define('mjsz-ad-placement', AdPlacementCE);
}

export default {
  install: () => register(),
};
