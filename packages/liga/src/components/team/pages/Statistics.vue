<script setup>
import { ref } from 'vue';
import { DataTable, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n, useColumns } from '@mjsz-vbr-elements/core/composables';
import { COLUMNS_TEAM_INFO, COLUMNS_TEAM_INFO_ICERINK } from '../team.internal.js';

defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const tooltipContainer = ref(null);

const { t } = useI18n();
const { columns: columnsFieldPlayers } = useColumns(COLUMNS_TEAM_INFO);
const { columns: columnsGoalies } = useColumns(COLUMNS_TEAM_INFO_ICERINK);
</script>

<template>
  <div>
    <h2 class="is-heading-2">{{ t('teams.fieldPlayers') }}</h2>
    <ResponsiveTable>
      <DataTable :columns="columnsFieldPlayers" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>

    <h2 class="is-heading-2">{{ t('teams.goalies') }}</h2>
    <ResponsiveTable>
      <DataTable :columns="columnsGoalies" :append-to="tooltipContainer"></DataTable>
    </ResponsiveTable>

    <div ref="tooltipContainer"></div>
  </div>
</template>
