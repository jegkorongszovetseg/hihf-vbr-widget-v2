<script setup>
import { convertTimesSecToMin, playerName, rawConvert } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const convertedRows = computed(() => rawConvert(props.rows, playerName, convertTimesSecToMin(['mip'])));
</script>

<template>
  <slot :rows="convertedRows" />
</template>
