<script setup>
import { computed } from 'vue';
import { propEq, reject } from 'ramda';
import { useSort } from '@mjsz-vbr-elements/core/composables';
import { SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core';
import { convert, playerName, rawConvert } from '@mjsz-vbr-elements/core/utils';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const { sort, change: onSort } = useSort();

const rawConvertedRows = computed(() => rawConvert(reject(propEq('GK', 'position'), props.rows), playerName));

const convertedRows = computed(() => {
  return convert(rawConvertedRows.value).sorted(sort).value();
});
</script>

<template>
  <slot :rows="convertedRows.rows" :sort="sort" :on-sort="onSort" />
</template>
