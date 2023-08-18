<script setup>
import { computed } from 'vue';
import { useSort } from '@mjsz-vbr-elements/core/composables';
import { SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core';
import { convert, playerName, rawConvert } from '@mjsz-vbr-elements/core/utils';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
});

const { sort, change: onSort } = useSort({
  sortTarget: 'row',
  orders: [{ target: 'row', direction: SORT_STATE_ASCEND }],
});

const rawConvertedRows = computed(() => rawConvert(props.rows, playerName));

const convertedRows = computed(() => {
  return convert(rawConvertedRows.value).sorted(sort).value();
});
</script>

<template>
  <slot :rows="convertedRows.rows" :sort="sort" :on-sort="onSort" />
</template>
