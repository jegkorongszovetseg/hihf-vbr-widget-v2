<script setup>
import { Image, DataTable, ResponsiveTable, FloatingPanel } from '@mjsz-vbr-elements/core/components';
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '@mjsz-vbr-elements/core';
import { NATIONALITY_FLAG_MAP } from '../internal.js';

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

      <template v-slot:cell-nationality="{ row }">
        <template v-for="country in row.nationality" :key="country">
          <FloatingPanel
            placement="top"
            :content="country"
            :append-to="appendTo"
            v-slot:default="{ setRef, show, hide }"
          >
            <div :ref="setRef" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
              <Image :src="`https://api.iconify.design/flag:${NATIONALITY_FLAG_MAP.get(country)}-4x3.svg`" />
            </div>
          </FloatingPanel>
        </template>
      </template>

      <template v-slot:cell-position="{ row }"> {{ row.position?.toUpperCase() }} </template>
    </DataTable>
  </ResponsiveTable>
</template>
