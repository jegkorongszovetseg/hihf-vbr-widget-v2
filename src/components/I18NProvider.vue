<script>
import { defineComponent } from 'vue';
import { createI18n } from '../composables/useI18n';
import hu from '../loacles/hu';
import en from '../loacles/en';

export default defineComponent({
  props: {
    locale: {
      type: String,
      default: 'hu'
    }
  },
  setup(props) {
    createI18n({
      locale: props.locale,
      messages: {
        hu,
        en,
      },
    });
  },
});
</script>

<template>
  <slot />
</template>
