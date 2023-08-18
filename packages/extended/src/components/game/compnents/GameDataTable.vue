<script setup>
import { ResponsiveTable, DataTable } from '@mjsz-vbr-elements/core/components';

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },

  rows: {
    type: Array,
    default: () => [],
  },

  title: {
    type: String,
    default: '',
  },

  sort: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['sort']);

const onSort = (payload) => emit('sort', payload);
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <ResponsiveTable v-slot:default="{ el: rootElement }">
      <DataTable
        :columns="props.columns"
        :rows="props.rows"
        :append-to="rootElement"
        :sort="sort"
        @sort="onSort"
      ></DataTable>
    </ResponsiveTable>
  </div>
</template>
