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

const { columns, error } = useColumns(COLUMNS_SCHEDULE, 'gameDateDate, gameDateTime');

const onSort = () => {
  console.log('SORT');
};
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <ResponsiveTable>
    <DataTable :columns="columns" :rows="props.rows" :is-loading="isLoading" @sort="onSort"></DataTable>
  </ResponsiveTable>
</template>
