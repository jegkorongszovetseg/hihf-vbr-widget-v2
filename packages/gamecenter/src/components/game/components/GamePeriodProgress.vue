<script setup>
import { computed } from 'vue';
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
  <div class="progress">
    <div
      class="progress-bar progress-bar-stripped progress-bar-animated"
      role="progressbar"
      :style="`width: ${(value / max) * 100}%`"
      :aria-valuenow="value"
      aria-valuemin="0"
      :aria-valuemax="max"
    />
  </div>
</template>
