import { reactive } from 'vue';

export const store = reactive({
  locales: ['hu', 'en'],
  locale: 'hu',
  setLocale(locale) {
    this.locale = locale;
  },
});
