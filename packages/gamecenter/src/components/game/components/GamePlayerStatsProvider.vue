<script setup>
import { useSort } from '@mjsz-vbr-elements/core/composables';
import { convert, playerName, rawConvert, upperCase } from '@mjsz-vbr-elements/core/utils';
import { propEq, reject } from 'ramda';
import { computed } from 'vue';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const { sort, change: onSort } = useSort();

const rawConvertedRows = computed(() =>
  rawConvert(reject(propEq('gk', 'row'), props.rows), upperCase('position'), playerName),
);

const convertedRows = computed(() => {
  return convert(rawConvertedRows.value).sorted(sort).value();
});
</script>

<template>
  <slot :rows="convertedRows.rows" :sort="sort" :on-sort="onSort" />
</template>
