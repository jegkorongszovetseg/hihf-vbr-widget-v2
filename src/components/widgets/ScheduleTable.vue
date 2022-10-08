<script setup>
import DataTable from '../DataTable.vue';
import { useColumns } from '../../composables/useColumns.js';
import { useI18n } from '../../composables/useI18n';
import { COLUMNS_SCHEDULE } from './internal';
import ResponsiveTable from '../ResponsiveTable.vue';
import { unref } from 'vue';
import Image from '../Image.vue';

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

const { columns, error } = useColumns(COLUMNS_SCHEDULE, props.hideColumns, { offsetName: 'CET' });
const { t } = useI18n();
</script>

<template>
  <div v-if="error">{{ error }}</div>
  <ResponsiveTable>
    <DataTable class="mjsz-vbr-table" :columns="columns" :rows="props.rows" :is-loading="isLoading">
      <template v-slot:cell-homeTeamName="{ row }">
        {{ row.homeTeamName }}
        <Image :class="`is-right`" :key="row.id" :src="row.homeTeamLogo" />
      </template>
      <template v-slot:cell-awayTeamName="{ row }">
        <Image :class="`image`" :key="row.id" :src="row.awayTeamLogo" />
        {{ row.awayTeamName }}
      </template>
      <template v-slot:cell-gameResultType="{ row }">
        <span v-if="row.isOvertime" class="label">{{ t('common.overtimeShort') }}</span>
        <span v-if="row.isShootout" class="label">{{ t('common.shootoutShort').value }}</span>
        <span v-if="row.seriesStandings" class="label">{{ row.seriesStandings }}</span>
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
