<script setup>
import { computed } from 'vue';
import { useMainClass } from '../composables/useMainClass.js';
import IconWarning from './icons/IconWarning.vue';

const props = defineProps({
  error: {
    type: String,
    default: '',
  },
});
const mainClass = useMainClass('error-notice');
const error = computed(() => props.error);
</script>

<template>
  <div :class="mainClass">
    <IconWarning class="icon" width="20" height="20"></IconWarning>
    <span>{{ error }}</span>
  </div>
</template>
