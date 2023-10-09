<script setup>
import { computed, ref } from 'vue';
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import { ResponsiveTable, DataTable } from '@mjsz-vbr-elements/core/components';

const props = defineProps({
  columns: {
    type: Object,
    default: () => ({}),
  },

  rows: {
    type: Array,
    default: () => [],
  },

  offsetName: {
    type: String,
    default: '',
  },
});

const tooltipContainer = ref(null);

const { columns } = useColumns(
  props.columns,
  null,
  computed(() => ({
    offsetName: props.offsetName,
  }))
);
</script>
<template>
  <div ref="tooltipContainer">
    <ResponsiveTable>
      <DataTable :columns="columns" :append-to="tooltipContainer">
        <template v-slot:cell-location="{ row }">
          {{ row.location?.locationName ?? '' }}
        </template>

        <template v-slot:cell-document="{ row }">
          <a v-if="row.schedule" :href="row.schedule" target="_blank"> Sorsolás </a>
          <a v-else-if="row.registration" :href="row.registration" target="_blank"> Regisztráció </a>
        </template>
      </DataTable>
    </ResponsiveTable>
  </div>
</template>
