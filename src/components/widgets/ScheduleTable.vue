<script setup>
import DataTable from '../DataTable.vue';
import { COLUMNS_SCHEDULE } from './internal';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  },

  isLoading: {
    type: Boolean,
    deafult: false,
  },
});
const onSort = () => {
  console.log('SORT');
};
</script>

<template>
  <DataTable :columns="COLUMNS_SCHEDULE" :rows="props.rows" :is-loading="isLoading" @sort="onSort"></DataTable>
</template>
