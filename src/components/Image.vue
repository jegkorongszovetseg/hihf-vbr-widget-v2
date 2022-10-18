<script setup>
import { useImage } from '@vueuse/core';
import { ref } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },

  title: {
    type: String,
    default: '',
  },

  defaultSrc: {
    type: String,
    default: '',
  },
});
const imageOptions = ref({ src: props.src });
const defaultSrc = ref({ src: props.defaultSrc });
const { error, isReady } = useImage(imageOptions);
</script>

<template>
  <img v-if="error && defaultSrc" :src="defaultSrc.src" :class="['is-loaded', $attrs.class]" />
  <img v-if="!error" :src="imageOptions.src" :class="[$attrs.class, { 'is-loaded': isReady }]" :title="props.title" />
</template>
