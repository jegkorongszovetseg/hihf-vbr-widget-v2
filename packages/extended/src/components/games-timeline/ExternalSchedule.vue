<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import IconRight from '@mjsz-vbr-elements/shared/icons/IconRight';

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
  <div :class="useMainClass('games-timeline-schedule-link')">
    <button type="button" @click="onNavigate">
      {{ title }}<IconRight />
    </button>
  </div>
</template>
