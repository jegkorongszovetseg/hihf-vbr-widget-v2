<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import IconRight from '@mjsz-vbr-elements/shared/icons/IconRight';

const props = defineProps({
  externalScheduleUrl: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['navigateTo']);

const { t } = useI18n();

function onNavigate() {
  emit('navigateTo', { url: props.externalScheduleUrl, target: '_self' });
}
</script>

<template>
  <div :class="useMainClass('games-timeline-schedule-link')">
    <button type="button" @click="onNavigate">
      {{ t('gamesTimeline.allSchedule') }}<IconRight />
    </button>
  </div>
</template>
