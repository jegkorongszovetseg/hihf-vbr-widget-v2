import { reactive } from 'vue';

export const store = reactive({
  locales: ['hu', 'en', 'ro'],
  locale: 'hu',
  setLocale(locale) {
    this.locale = locale;
  },
});
