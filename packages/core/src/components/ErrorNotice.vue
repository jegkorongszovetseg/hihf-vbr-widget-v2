<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useMainClass } from '../composables/useMainClass.js';
import IconWarning from '@mjsz-vbr-elements/shared/icons/IconWarning';

const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
});

const { t, hasTranslation } = useI18n();

const mainClass = useMainClass('error-notice');

const errorMessage = computed(() => {
  if (!hasTranslation(`errors.${props.error.key}`)) return `${props.error.key}: ${props.error?.message}`;
  return t(`errors.${props.error.key}`, props.error.cause);
});
</script>

<template>
  <div :class="mainClass">
    <IconWarning class="icon" width="20" height="20" />
    <span>{{ errorMessage }}</span>
  </div>
</template>
