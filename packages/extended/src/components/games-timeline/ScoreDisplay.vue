<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

defineProps({
  score: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div :class="useMainClass('score-display')">
    <div class="is-score">
      <transition name="is-slide-transition">
        <span :key="score">{{ score }}</span>
      </transition>
    </div>
  </div>
</template>
