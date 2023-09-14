<script setup>
import { computed } from 'vue';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { usePeriodTime } from '../composables';

const props = defineProps({
  gameData: {
    type: Object,
    required: true,
  },
});

const { max, value } = usePeriodTime(computed(() => props.gameData));
</script>

<template>
  <div :class="useMainClass('progress')">
    <div
      :class="`${useMainClass('progress-bar')} ${useMainClass('progress-bar-stripped')} ${useMainClass(
        'progress-bar-animated'
      )}`"
      role="progressbar"
      :style="`transform: scaleX(${value / max})`"
      :aria-valuenow="value"
      aria-valuemin="0"
      :aria-valuemax="max"
    ></div>
  </div>
</template>
