<script setup>
import { toRef } from 'vue';
import { useAdditionalText, useI18n } from '../composables';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },

  additionalKey: {
    type: String,
    required: true,
  },
});

const rows = toRef(props, 'rows');
const { t, locale } = useI18n();

const { isVisible, text } = useAdditionalText(rows, props.additionalKey, t, locale);
</script>

<template>
  <div v-if="isVisible" class="is-text-xs is-text-light is-mt-5 is-mb-5" v-text="text" />
</template>
