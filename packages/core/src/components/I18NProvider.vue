<script>
import { mergeDeepRight } from 'ramda';
import { computed, defineComponent } from 'vue';
import { createI18n } from '../composables/useI18n';
import en from '../locales/en.json';
import hu from '../locales/hu.json';

export default defineComponent({
  props: {
    locale: {
      type: String,
      default: 'hu',
    },

    messages: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const messages = mergeDeepRight({ hu, en }, props.messages);
    const { translate } = createI18n({
      locale: computed(() => props.locale),
      messages,
    });

    return {
      translate,
    };
  },
});
</script>

<template>
  <slot :t="translate" />
</template>
