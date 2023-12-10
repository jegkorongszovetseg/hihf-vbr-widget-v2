<script setup>
import { toRef } from 'vue';
import { useI18n, useInheritedPoints } from '../composables';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const { t } = useI18n();
const { isVisible, text } = useInheritedPoints(toRef(props, 'rows'), t);
</script>

<template>
  <div v-if="isVisible" class="is-text-xs is-text-light is-mt-5 is-mb-5" v-text="text" />
</template>
