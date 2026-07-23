import { defineCustomElement } from 'vue';

import AdPlacement from './components/ad-placement-tool/AdPlacement.ce.vue';
import IVRIdentifiers from './components/ivr-identifiers/IvrIdentifiers.ce.vue';
import RssReader from './components/rss-reader/RssReader.ce.vue';

const AdPlacementCE = defineCustomElement(AdPlacement);
const IVRIdentifiersCE = defineCustomElement(IVRIdentifiers);
const RssReaderCE = defineCustomElement(RssReader);

export { AdPlacement, AdPlacementCE, IVRIdentifiers, IVRIdentifiersCE, RssReader, RssReaderCE };

export function register() {
  customElements.define('mjsz-ad-placement', AdPlacementCE);
  customElements.define('mjsz-ivr-identifiers', IVRIdentifiersCE);
  customElements.define('mjsz-rss-reader', RssReaderCE);
}

export default {
  install: () => register(),
};
