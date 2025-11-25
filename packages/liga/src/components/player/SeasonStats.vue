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
  <h2>
    {{ rows[0]?.season ?? '' }}
  </h2>
  <ResponsiveTable class="mb-md">
    <DataTable :rows="rows" :columns="columns" :is-loading="isLoading" :append-to="appendTo" />
  </ResponsiveTable>
</template>
