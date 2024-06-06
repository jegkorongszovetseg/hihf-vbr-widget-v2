<script setup>
import { ref, toRefs } from 'vue';
import { useImage } from '@vueuse/core';

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
});
const { defaultSrc } = toRefs(props);
const imageOptions = ref({ src: props.src });
const { error, isReady } = useImage(imageOptions, { resetOnExecute: false, shallow: false });
</script>

<template>
  <img v-if="error && defaultSrc" :src="defaultSrc" :class="['is-loaded is-default', $attrs.class]" />
  <img
    v-if="!error"
    :src="imageOptions.src"
    :class="[$attrs.class, { 'is-loaded': isReady }]"
    :title="props.title"
    loading="lazy"
  />
</template>
