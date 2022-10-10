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
const { error, isReady } = useImage(imageOptions);
</script>

<template>
  <div v-if="error">Failed</div>
  <img v-else :src="imageOptions.src" :class="{ 'is-loaded': isReady }" />
</template>
