<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

const props = defineProps({
  externalScheduleUrl: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['navigate-to']);

function onNavigate() {
  emit('navigate-to', { url: props.externalScheduleUrl, target: '_self' });
}
</script>

<template>
  <div :class="useMainClass('games-timeline-schedule-link')">
    <button type="button" @click="onNavigate">Teljes menetrend</button>
  </div>
</template>
