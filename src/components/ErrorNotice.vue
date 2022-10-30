<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useMainClass } from '../composables/useMainClass.js';
import IconWarning from './icons/IconWarning.vue';

const props = defineProps({
  error: {
    type: String,
    default: '',
  },

  errorObject: {
    type: Object,
    default: () => ({}),
  },
});

const { t } = useI18n();

const mainClass = useMainClass('error-notice');
// const error = computed(() => props.error);
const errorMessage = computed(() => {
  return t(`errors.${props.errorObject.value.key}`, props.errorObject.value.cause );
});
</script>

<template>
  <div :class="mainClass">
    <IconWarning class="icon" width="20" height="20"></IconWarning>
    <span>{{ errorMessage }}</span>
  </div>
</template>
