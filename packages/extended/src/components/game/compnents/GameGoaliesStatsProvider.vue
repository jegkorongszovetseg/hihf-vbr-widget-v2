<script setup>
import { computed } from 'vue';
import { playerName, rawConvert } from '@mjsz-vbr-elements/core/utils';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const convertedRows = computed(() => rawConvert(props.rows, playerName));

// const convertedRows = computed(() => {
//   return convert(rawConvertedRows.value).sorted(sort).value();
// });
</script>

<template>
  <slot :rows="convertedRows" :sort="sort" :on-sort="onSort" />
</template>
