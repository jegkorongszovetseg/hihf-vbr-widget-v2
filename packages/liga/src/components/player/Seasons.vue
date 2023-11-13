<script setup>
import { computed } from 'vue';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';

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
const { t } = useI18n();

const { columns } = useColumns(computed(() => props.columns));
</script>

<template>
  <h2 class="is-heading-2">{{ t('player.seasons') }}</h2>
  <ResponsiveTable>
    <DataTable :rows="rows" :columns="columns" :append-to="appendTo" />
  </ResponsiveTable>
</template>
