<script setup>
defineProps({
  score: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="score-display">
    <div class="is-score">
      <transition name="is-slide-transition">
        <span :key="score">{{ score }}</span>
      </transition>
    </div>
  </div>
</template>
