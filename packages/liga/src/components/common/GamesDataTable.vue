<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';

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

  // sort: {
  //   type: Object,
  //   default: () => ({}),
  // },

  isLoading: {
    type: Boolean,
    default: false,
  },

  gameResolver: {
    type: Function,
    default: () => ({}),
  },

  championshipId: {
    type: String,
    default: '',
  },
});

</script>
<template>
  <ResponsiveTable>
    <DataTable :rows="rows" :columns="columns" :append-to="appendTo">
      <template v-slot:cell-resultType="{ row }">
        <span
          :class="[
            'is-badge',
            {
              'is-green': ['W', 'OTW', 'SOW'].includes(row.resultType),
              'is-red': ['L', 'OTL', 'SOL'].includes(row.resultType),
              'is-yellow': row.resultType === 'D',
            },
          ]"
        >
          {{ row.resultType }}
        </span>
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
