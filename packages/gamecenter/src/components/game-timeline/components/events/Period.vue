<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconTimer from '@mjsz-vbr-elements/shared/icons/IconTimer';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();
</script>

<template>
  <div class="is-period-header">
    <div />
    <p>{{ event.eventTime }}</p>
    <span><IconTimer /> {{ t(`periods.${event.labelKey}`) }}</span>
  </div>
</template>
