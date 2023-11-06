<script setup>
import { Image, DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '@mjsz-vbr-elements/core';

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

  sort: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['sort']);

const { columns } = useColumns(props.columns);

const onSort = (payload) => emit('sort', payload);
</script>
<template>
  <ResponsiveTable>
    <DataTable :columns="columns" :rows="rows" :append-to="appendTo" :sort="sort" @sort="onSort">
      <template v-slot:cell-playerPortrait="{ row }">
        <div class="is-portrait-image">
          <Image :key="row.playerId" :src="row.picture" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>

      <template v-slot:cell-nationality="{ row }"> {{ row.nationality }} </template>

      <template v-slot:cell-position="{ row }"> {{ row.position?.toUpperCase() }} </template>
    </DataTable>
  </ResponsiveTable>
</template>
