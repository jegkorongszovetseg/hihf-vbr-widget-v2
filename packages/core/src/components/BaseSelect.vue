<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
});

const emits = defineEmits(['update:modelValue']);

const value = computed({ get: () => props.modelValue, set: value => emits('update:modelValue', value) });
</script>

<template>
  <select v-model="value" class="base-input is-select">
    <slot />
  </select>
</template>
