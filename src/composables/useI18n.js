import { computed, inject, provide, reactive } from 'vue';
import { path } from 'ramda';

const I18nContext = Symbol('I18nContext');

const state = reactive({
  messages: {},
  locale: '',
  fallbackLocale: '',
});

export const createI18n = ({ messages = {}, locale = '', fallbackLocale = '' }) => {
  state.messages = messages;
  state.locale = locale;
  state.fallbackLocale = fallbackLocale;

  const translate = (key) => {
    const keyArray = key.split('.') || [];
    let translation = computed(() => getTranslation(state.locale, keyArray, state.messages));
    if (!translation.value) {
      translation = computed(() => getTranslation(state.fallbackLocale, keyArray, state.messages));
    }
    return translation;
  };

  function getTranslation(locale, keys, messages) {
    return path([locale, ...keys], messages);
  }

  const setLocale = (locale) => {
    state.locale = locale;
  };

  const reactiveLocale = computed({
    get() {
      return state.locale;
    },
    set(locale) {
      state.locale = locale;
    },
  });

  const api = {
    locale: reactiveLocale,
    setLocale,
    translate,
  };

  provide(I18nContext, api);
};

export const useI18n = (settings) => {
  if (settings) {
    state.messages = settings.messages;
    state.locale = settings.locale;
    state.fallbackLocale = settings.fallbackLocale;
  }

  const api = useI18nContext();

  return {
    locale: api.locale,
    t: api.translate,
    setLocale: api.setLocale,
  };
};

const useI18nContext = () => {
  const api = inject(I18nContext, null);
  if (api === null) {
    throw new Error('Privider is missing a parent component.');
  }
  return api;
};
