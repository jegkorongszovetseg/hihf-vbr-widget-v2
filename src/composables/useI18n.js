import { computed, inject, provide, reactive } from 'vue';
import { $computed } from 'vue/macros';
import { path, isEmpty, trim, map, split } from 'ramda';

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

  const translate = (key, data = {}) => {
    const hasInterpolation = !isEmpty(data);
    const keyArray = map(trim, split('.', key));

    const translation = $computed(() => {
      let rawTransition = getTranslation(state.locale, keyArray, state.messages);
      if (!rawTransition && state.fallbackLocale) {
        rawTransition = getTranslation(state.fallbackLocale, keyArray, state.messages);
      }
      return hasInterpolation ? replacer(rawTransition, data) : rawTransition;
    });
    return translation;
  };

  const hasTranlation = (key) => {
    const keyArray = map(trim, split('.', key));
    return Boolean(getTranslation(state.locale, keyArray, state.messages));
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
    hasTranlation,
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
    hasTranlation: api.hasTranlation,
  };
};

const useI18nContext = () => {
  const api = inject(I18nContext, null);
  if (api === null) {
    throw new Error('Privider is missing a parent component.');
  }
  return api;
};

const replacer = function (tpl, data) {
  return tpl.replace(/\{(\w+)\}/g, function ($1, $2) {
    return data[$2];
  });
};
