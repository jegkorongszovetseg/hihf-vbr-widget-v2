<script setup>
import { useImage } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
});
const imageOptions = ref({ src: props.src });
const { isLoading, error, isReady } = useImage(imageOptions);
</script>

<template>
  <div v-if="isLoading" class="">Loading...</div>
  <div v-else-if="error">Failed</div>
  <img v-else :src="imageOptions.src" :class="{ 'is-loaded': isReady }" />
</template>

<style lang="scss" scoped>
img {
  opacity: 0;
  transition: opacity 5s ease-out;
  // animation
}
img.is-loaded {
  opacity: 1;
}
</style>
