<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';

const props = defineProps({
  columns: {
    type: Object,
    default: () => ({}),
  },

  rows: {
    type: Array,
    default: () => [],
  },

  appendTo: {
    type: [Object, String],
    default: null,
  },

  isLoading: {
    type: Boolean,
    default: false,
  },
});

const { columns } = useColumns(computed(() => props.columns));
</script>

<template>
  <ResponsiveTable>
    <DataTable :rows="rows" :columns="columns" :append-to="appendTo" />
  </ResponsiveTable>
</template>
