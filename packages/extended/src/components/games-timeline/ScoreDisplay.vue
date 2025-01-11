<template>
  <div class="numbers">
    <div class="score">
      <transition name="slide">
        <span :key="score">{{ score }}</span>
      </transition>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped>
.numbers {
  height: 20px;
  padding: 0 5px !important;

  .score {
    display: grid;
    grid-template-areas: 'stack';
    justify-items: center;
    position: relative;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, transparent 0, black 30%, black 70%, transparent 100%);

    > span {
      grid-area: stack;
      line-height: 20px;
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 420ms linear;
}

.slide-enter-from {
  transform: translateY(-100%);
}

.slide-enter-to {
  transform: translateY(0);
}

.slide-leave-from {
  transform: translateY(0);
}

.slide-leave-to {
  transform: translateY(100%);
}
</style>
