<script setup>
import { toRef, watch } from 'vue';
import { useI18n, useInheritedPoints } from '../composables';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const rows = toRef(props, 'rows');
const { t } = useI18n();

watch(rows, (r) => console.log('watch:', r), { immediate: true });

const { isVisible, text } = useInheritedPoints(rows, t);
</script>

<template>
  <div v-if="isVisible" class="is-text-xs is-text-light is-mt-5 is-mb-5" v-text="text" />
</template>
