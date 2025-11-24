import { defineCustomElement } from 'vue';

import FormControls from './internal/FormControls.ce.vue';

const FormControlsCE = defineCustomElement(FormControls);

export { FormControls, FormControlsCE };

export function register() {
  customElements.define('internal-form-controls', FormControlsCE);
}

export default {
  install: () => register(),
};
