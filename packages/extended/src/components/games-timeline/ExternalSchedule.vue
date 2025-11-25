<script setup>
import { IconRight } from '@mjsz-vbr-elements/shared/icons';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  externalScheduleUrl: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['navigateTo']);

function onNavigate() {
  emit('navigateTo', { url: props.externalScheduleUrl, target: '_self' });
}
</script>

<template>
  <div class="games-timeline-schedule-link">
    <button type="button" @click="onNavigate">
      {{ title }}<IconRight />
    </button>
  </div>
</template>
