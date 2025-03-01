<script setup>
defineProps({
  number: [Number, String],
});
</script>

<template>
  <div class="is-number">
    <transition name="is-slide-transition">
      <span :key="number">{{ number }}</span>
    </transition>
  </div>
</template>
