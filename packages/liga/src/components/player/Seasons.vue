<script setup>
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useColumns, useI18n } from '@mjsz-vbr-elements/core/composables';
import { COLUMNS_PLAYER_SEASON_STATS } from '../internal';

const props = defineProps({
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

const { columns } = useColumns(COLUMNS_PLAYER_SEASON_STATS);
</script>

<template>
  <h2 class="is-heading-2">{{ t('player.seasons') }}</h2>
  <ResponsiveTable>
    <DataTable :rows="rows" :columns="columns" :append-to="appendTo" />
  </ResponsiveTable>
</template>
