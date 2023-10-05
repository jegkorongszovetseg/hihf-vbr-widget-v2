<script setup>
import { computed } from 'vue';
import { playerName, rawConvert, convertTimesSecToMin } from '@mjsz-vbr-elements/core/utils';

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
