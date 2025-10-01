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
    <p>{{ event.eventPeriod === 'pre' ? '-20:00' : event.eventTime }}</p>
    <span><IconTimer /> {{ t(`periods.${event.eventPeriod}`) }}</span>
  </div>
</template>
