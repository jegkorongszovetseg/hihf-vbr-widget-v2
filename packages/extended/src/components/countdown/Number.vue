<script setup>
defineProps({
  number: [Number, String],
  direction: {
    type: String,
    default: 'increase',
  },
});
</script>

<template>
  <div class="is-number" :data-number="number">
    <transition :name="`slide-${direction}`">
      <span :key="number">{{ number }}</span>
    </transition>
  </div>
</template>
