<script setup>
import { useImage } from '@vueuse/core';
import { ref, toRefs } from 'vue';

defineOptions({
  inheritAttrs: false,
});

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

  width: {
    type: Number,
    default: undefined,
  },

  height: {
    type: Number,
    default: undefined,
  },
});
const { defaultSrc } = toRefs(props);
const imageOptions = ref({ src: props.src });
const { error, isReady } = useImage(imageOptions, { resetOnExecute: false, shallow: false });
</script>

<template>
  <img
    v-if="error && defaultSrc"
    :src="defaultSrc"
    class="is-loaded is-default"
    :class="[$attrs.class]"
    :style="[$attrs.style]"
    :width="width"
    :height="height"
  >
  <img
    v-if="!error"
    :src="imageOptions.src"
    :title="props.title"
    :class="[$attrs.class, { 'is-loaded': isReady }]"
    :style="[$attrs.style]"
    :width="width"
    :height="height"
    loading="lazy"
  >
</template>
