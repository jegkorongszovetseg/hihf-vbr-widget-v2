<script setup>
import DataTable from '../DataTable.vue';
import { useColumns } from '../../composables/useColumns.js';
import { COLUMNS_SCHEDULE } from './internal';
import ResponsiveTable from '../ResponsiveTable.vue';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },

  isLoading: {
    type: Boolean,
    deafult: false,
  },

  hideColumns: {
    type: String,
    default: '',
  },
});

const { columns, error } = useColumns(COLUMNS_SCHEDULE, props.hideColumns, { offsetName: 'CET' });
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <ResponsiveTable>
    <DataTable class="mjsz-vbr-table" :columns="columns" :rows="props.rows" :is-loading="isLoading"></DataTable>
  </ResponsiveTable>
</template>
