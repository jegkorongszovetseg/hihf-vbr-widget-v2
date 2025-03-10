<script setup>
import IconWarning from '@mjsz-vbr-elements/shared/icons/IconWarning';
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },

  useRetry: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['retry']);

const { t, hasTranslation } = useI18n();

const errorMessage = computed(() => {
  if (hasTranslation(`errors.${props.error.key}`))
    return t(`errors.${props.error.key}`, props.error.cause || [props.error?.message]);
  return props.error?.message;
});
</script>

<template>
  <div class="error-notice">
    <IconWarning class="icon" width="20" height="20" />
    <span>{{ errorMessage }}</span>
    <button v-if="useRetry" type="button" @click="$emit('retry')" v-text="t('common.retry')" />
  </div>
</template>
