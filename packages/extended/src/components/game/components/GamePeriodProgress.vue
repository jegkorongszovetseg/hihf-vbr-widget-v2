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
  <!-- {{ value }} -->
  <progress :max="max" :value="value"></progress>
</template>
