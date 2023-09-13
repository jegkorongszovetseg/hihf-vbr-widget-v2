<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
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
  <div :class="useMainClass('gamecenter-data-table')">
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
