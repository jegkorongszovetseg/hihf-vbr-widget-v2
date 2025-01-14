import { isEmpty, map, path, split, trim } from 'ramda';
import { computed, defineComponent, h, inject, provide, reactive } from 'vue';

const I18nContext = Symbol('I18nContext');

const state = reactive({
  messages: {},
  locale: '',
  fallbackLocale: '',
});

export function createI18n({ messages = {}, locale = '', fallbackLocale = '' }) {
  state.messages = messages;
  state.locale = locale;
  state.fallbackLocale = fallbackLocale;

  const translate = (key, data = {}) => {
    const hasInterpolation = !isEmpty(data);
    const keyArray = map(trim, split('.', key));

    const translation = computed(() => {
      const rawTransition = resolveTransition(keyArray);
      return hasInterpolation ? replacer(rawTransition, data) : rawTransition;
    });
    return translation.value;
  };

  const hasTranslation = (key) => {
    const keyArray = map(trim, split('.', key));
    return Boolean(getTranslation(state.locale, keyArray, state.messages));
  };

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
    hasTranslation,
  };

  provide(I18nContext, api);

  return {
    translate,
  };
}

export function useI18n(settings) {
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
    hasTranslation: api.hasTranslation,
  };
}

function useI18nContext() {
  const api = inject(I18nContext, null);
  if (api === null) {
    throw new Error('Privider is missing a parent component.');
  }
  return api;
}

function resolveTransition(keys = []) {
  let rawTransition = getTranslation(state.locale, keys, state.messages);
  if (!rawTransition && state.fallbackLocale) {
    rawTransition = getTranslation(state.fallbackLocale, keys, state.messages);
  }
  if (!rawTransition)
    return keys.join('.');
  return rawTransition;
}

function getTranslation(locale, keys, messages) {
  return path([locale, ...keys], messages);
}

function replacer(tpl, data) {
  return tpl.replace(/\{(\w+)\}/g, ($1, $2) => {
    return data[$2];
  });
}

export const i18n = defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },

    path: {
      type: String,
      defult: '',
    },
  },

  setup(props, { slots }) {
    const keys = map(trim, split('.', props.path));
    const transition = resolveTransition(keys);
    const interpolationItems = split(/\{|\}/, transition);

    const children = Object.keys(slots).map((item) => {
      const index = interpolationItems.indexOf(item);
      if (index > -1)
        interpolationItems[index] = slots[item]()[0];
      return interpolationItems;
    });

    return () => h(props.tag, children);
  },
});
