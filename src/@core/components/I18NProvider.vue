<script>
import { computed, defineComponent } from 'vue';
import { createI18n } from '../composables/useI18n';
import hu from '../loacles/hu.json';
import en from '../loacles/en.json';

export default defineComponent({
  props: {
    locale: {
      type: String,
      default: 'hu',
    },
  },
  setup(props) {
    const { translate } = createI18n({
      locale: computed(() => props.locale),
      messages: {
        hu,
        en,
      },
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
