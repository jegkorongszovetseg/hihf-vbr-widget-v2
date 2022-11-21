<script setup>
import { computed } from 'vue';
import { useMainClass } from '../composables/useMainClass';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
});

const emits = defineEmits(['update:modelValue']);
const baseInputClass = useMainClass('base-input');

const value = computed({ get: () => props.modelValue, set: (value) => emits('update:modelValue', value) });
</script>

<template>
  <select v-model="value" :class="[baseInputClass, 'is-select']">
    <slot />
  </select>
</template>
